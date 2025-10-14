import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { storeProduct } from '@/models/store.model';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

interface updateItemDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: storeProduct | null;
    onUpdated: () => void
}

interface updateForm {
    itemRate: number;
    itemQuantity: number
}

function UpdateProductDialog({ isOpen, onClose, product, onUpdated }: updateItemDialogProps) {

    const form = useForm<updateForm>(
        {
            defaultValues: {
                itemRate: product?.itemRate,
                itemQuantity:product?.itemQuantity ,
            },
        }
    )

    useEffect(() => {
        if (product) {
          form.reset({
            itemRate: product.itemRate,
            itemQuantity: product.itemQuantity,
          });
        }
      }, [product, form]);

    // console.log("p", product)

    const onSubmit = async (data : updateForm) => {
        
        await axios.put(`/api/inventory/update-item/${product?._id}`,{
            itemRate: data.itemRate,
            itemQuantity : data.itemQuantity
        })
        onUpdated()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                            control={form.control}
                            name="itemRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rate</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...field}
                                            value={field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="itemQuantity"
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
    )
}

export default UpdateProductDialog
