import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Trash2 } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Item } from '@radix-ui/react-navigation-menu';
import { outsideProcessingProduct } from '@/models/outsideProcessing.model';

interface RequiredItem {
    itemName: string;
    quantityNeeded: number;
}

interface CreateForm {
    productName: string;
    requiredItems: RequiredItem[];
}

interface CreateProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProductDialog({ isOpen, onClose }: CreateProductDialogProps) {
    const [filteredItems, setFilteredItems] = useState<RequiredItem[]>([]);
    const [searchValue, setSearchValue] = useState("");

    const form = useForm<CreateForm>({
        defaultValues: {
            productName: "",
            requiredItems: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "requiredItems",
    });

    const handleSearch = async (value: string) => {
        setSearchValue(value);
        if (!value.trim()) return setFilteredItems([]);

        try {
            const response = await axios.get('/api/outside-processing/get-all-products');
            const productData: RequiredItem[] = response.data.data;

            const filtered = productData.filter(product =>
                product.itemName.toLowerCase().includes(value.toLowerCase())
            );

            setFilteredItems(filtered);
        } catch {
            setFilteredItems([]);
        }
    };

    const handleAddItem = (item: RequiredItem) => {
        if (!fields.some(field => field.itemName === item.itemName)) {
            append({
                itemName: item.itemName,
                quantityNeeded: 1,
            });
            setSearchValue('');
            setFilteredItems([]);
        }
    };

    const onSubmit = async (data: CreateForm) => {
        // console.log("Submitting:", data);


        try {
    
            await axios.post('/api/outside-processing/create-product', data);
            // console.log("Product created successfully:", res.data);

            onClose();
            form.reset();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create a Product</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1 w-full">

                        {/* PRODUCT NAME */}
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Finished Good Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* REQUIRED ITEMS SEARCH + LIST */}
                        <div className="space-y-2 border p-4 rounded-lg relative">
                            <h4 className="text-sm font-medium">Required Items (Bill of Materials)</h4>

                            <Input
                                placeholder="Search items..."
                                value={searchValue}
                                onChange={(e) => handleSearch(e.target.value)}
                            />

                            {filteredItems.length > 0 && (
                                <div className="absolute left-0 right-0 mx-4 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
                                    {filteredItems.map((item) => (
                                        <div
                                            key={item.itemName}
                                            className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                            onClick={() => handleAddItem(item)}
                                        >
                                            <span>{item.itemName}</span>
                                            <Button type="button" size="sm" variant="outline" className="h-7">+ Add</Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pt-2">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-center space-x-2 border p-2 rounded-md">

                                        <div className="flex-grow font-medium text-sm">
                                            {field.itemName}
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name={`requiredItems.${index}.quantityNeeded`}
                                            render={({ field: qtyField }) => (
                                                <FormItem className="w-24 space-y-0">
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            placeholder="Qty"
                                                            {...qtyField}
                                                            onChange={(e) => qtyField.onChange(parseInt(e.target.value))}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                            <Trash2 className="text-red-500 h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}

                                {fields.length === 0 && (
                                    <p className="text-sm italic text-gray-500">Start searching above to add components.</p>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Create Product
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
