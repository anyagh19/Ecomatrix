import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface AddProductProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Product {
    productName: string;
}

interface AddForm {
    productName: string;
    productQuantity: number;
}

export const AddProductDialog = ({ isOpen, onClose }: AddProductProps) => {
    const [finalProducts, setFinalProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const form = useForm<AddForm>({
        defaultValues: {
            productName: "",
            productQuantity: 0,
        },
    });

    // Fetch all manufactured products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/manufactured-product/get-all-final-products");
                setFinalProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    // Live search
    useEffect(() => {
        const subscription = form.watch((values) => {
            const name = values.productName ?? "";
            if (!name) {
                setFilteredProducts([]);
                return;
            }

            const filtered = finalProducts.filter((p) =>
                p.productName.toLowerCase().includes(name.toLowerCase())
            );

            setFilteredProducts(filtered);
        });

        return () => subscription.unsubscribe();
    }, [finalProducts, form]);

    // Form submit
    const submitHandler = async (data: AddForm) => {
        try {
            // Get final product recipe
            const getProduct = await axios.post(
                "/api/manufactured-product/get-final-product",
                { productName: data.productName }
            );

            const requiredItems = getProduct.data.data.requiredItems;

            let shortages: { itemName: string; required: number; available: number }[] = [];
            let stockUpdates: { itemName: string; newQuantity: number }[] = [];

            // Check each outside ingredient
            for (const item of requiredItems) {
                const res = await axios.post(
                    "/api/outside-processing/get-outside-product",
                    { objectId: item.outsideId }
                );

                const availableQty = res.data.data.quantity;
                const itemName = res.data.data.itemName;
                const requiredQty = item.quantityNeeded * data.productQuantity;

                if (availableQty < requiredQty) {
                    shortages.push({
                        itemName,
                        required: requiredQty,
                        available: availableQty,
                    });
                } else {
                    stockUpdates.push({
                        itemName,
                        newQuantity: availableQty - requiredQty,
                    });
                }
            }

            // If shortage → stop here
            if (shortages.length > 0) {
                let msg = "❌ Insufficient stock:\n\n";
                shortages.forEach(s => {
                    msg += `${s.itemName} → Required: ${s.required}, Available: ${s.available}\n`;
                });

                alert(msg);
                return;
            }

            // Everything is OK → update stock now
            for (const u of stockUpdates) {
                await axios.post("/api/outside-processing/update-outside-quantity", {
                    itemName: u.itemName,
                    newQuantity: u.newQuantity
                });
            }

            // Add manufactured product
            await axios.put("/api/manufactured-product/add-final-product", data);

            onClose();
            form.reset();

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Add Manufacturing Product</DialogTitle>
                </DialogHeader>

                {/* FORM START */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">

                        {/* PRODUCT NAME */}
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Search product..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* SEARCH DROPDOWN */}
                        {filteredProducts.length > 0 && (
                            <div className="border rounded p-2 max-h-40 overflow-y-auto">
                                {filteredProducts.map((item, index) => (
                                    <div
                                        key={index}
                                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                                        onClick={() => {
                                            form.setValue("productName", item.productName);
                                            setFilteredProducts([]);
                                        }}
                                    >
                                        {item.productName}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* PRODUCT QUANTITY */}
                        <FormField
                            control={form.control}
                            name="productQuantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter quantity"
                                            className="appearance-none
                                                [&::-webkit-outer-spin-button]:appearance-none
                                                [&::-webkit-inner-spin-button]:appearance-none
                                                [-moz-appearance:textfield]"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* SUBMIT BUTTON */}
                        <Button type="submit" className="w-full">
                            Add Product
                        </Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
