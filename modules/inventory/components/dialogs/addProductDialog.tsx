import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { storeProduct } from '@/models/store.model';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface addProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

interface addForm {
    itemName: string;
    quantityAdded: number;
}

function AddProductDialog({ isOpen, onClose  }: addProductDialogProps) {
    const form = useForm<addForm>({
        defaultValues: {
            itemName: "",
            quantityAdded: 0,
        },
    });

    const [products, setProducts] = useState<storeProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<storeProduct[]>([]);
    const [userName , setUserName] = useState<string>('')

    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('/api/user/current-user')
            // console.log("use", res.data.user.name)
            setUserName(res.data.user.name)
            router.push("/inventory")
        }
        fetchUser()
    },[])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/inventory/get-all-products');
            // console.log("arr", res.data.data)
            setProducts(res.data.data || []);
        };
        fetchProducts();
    }, []);


    // Filter products as user types
    const handleSearch = (value: string) => {
        const filtered = products.filter(product =>
            product.itemName.toLowerCase().includes(value.toLowerCase())
        );
        // console.log(filtered)
        setFilteredProducts(filtered);
        form.setValue("itemName", value); // update form field
    };

    const onSubmit = async (data: addForm) => {
        try {
            console.log("name", data.itemName)
            console.log("name", data.quantityAdded)
            console.log(userName)
            await axios.post("/api/inventory/add-item", {
                itemName: data.itemName,
                quantityAdded: data.quantityAdded,
                userName
            });
            form.reset();
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="itemName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Command>
                                            <CommandInput
                                                placeholder="Type product name..."
                                                value={field.value}
                                                onValueChange={handleSearch}
                                            />
                                            <CommandList>
                                                {filteredProducts.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
                                                <CommandGroup>
                                                    {filteredProducts.map((product) => (
                                                        <CommandItem
                                                            key={product._id}
                                                            onSelect={() => form.setValue("itemName", product.itemName)}
                                                        >
                                                            {product.itemName}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantityAdded"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...field}
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddProductDialog;
