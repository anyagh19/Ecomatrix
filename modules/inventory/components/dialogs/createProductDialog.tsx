import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';

interface createProductDialogProps {
    isOpen: boolean;
    onClose: () => void;

}

interface createForm {
    itemName: string;
    itemRate: number;
    itemQuantity: string
}

function CreateProductDialog({ isOpen, onClose }: createProductDialogProps) {

    const form = useForm<createForm>(
    {defaultValues: {
        itemName: "",
        itemRate: 0
        }}
    );

    const onSubmit = async (data: createForm) => {
        try {
            console.log(data)
            const res = await axios.post("/api/inventory/create-item", {
                itemName: data.itemName,
                itemRate: data.itemRate,
                itemQuantity : "0"
            })
            onClose()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>
                        Create New Product
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 border-2 p-6 rounded-lg w-full"
                    >


                        
                        <FormField
                            control={form.control}
                            name="itemName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="metal sheet" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        
                        <FormField
                            control={form.control}
                            name="itemRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rate</FormLabel>
                                    <FormControl>
                                        <Input type="number"
                                            placeholder="100"
                                            {...field}
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        
                        <Button type="submit" className="w-full" onSubmit={onClose}>
                            Submit
                        </Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProductDialog
