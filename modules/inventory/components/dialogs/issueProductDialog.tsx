import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Table, TableBody } from '@/components/ui/table';
import { storeProduct } from '@/models/store.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface IssueProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: storeProduct | null;
}

function IssueProductDialog({ isOpen, onClose, product }: IssueProductDialogProps) {
    const [openOutsideDialog, setOpenOutsideDialog] = useState(false);
    const [productDetails, setProductDetails] = useState({
        productName: product?.itemName || '',
        productQuantity: product?.itemQuantity || 0,
        quantity: 0
    });

    useEffect(() => {
        if (product) {
            setProductDetails({
                productName: product.itemName,
                productQuantity: product.itemQuantity,
                quantity: 0
            });
        }
    }, [product]);

    const handleOutsideSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log('Outside Processing Details:', productDetails);

            // Issue to outside processing
            const res = await axios.put('/api/inventory/issue-to-outside-processing', {
                itemName: productDetails.productName,
                quantity: productDetails.quantity
            });

            if (res.status === 200 && product) {
                // Update inventory quantity
                const updatedQuantity = productDetails.productQuantity - productDetails.quantity;
                await axios.put(`/api/inventory/update-item/${product._id}`, {
                    itemQuantity: updatedQuantity
                });
            }

            setOpenOutsideDialog(false); // Close dialog
        } catch (error) {
            console.error('Error issuing product:', error);
        }
    };

    return (
        <>
            {/* Main Dialog */}
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>Product History</DialogHeader>
                    <Table>
                        <TableBody className='flex gap-4'>
                            <Button onClick={() => setOpenOutsideDialog(true)}>Outside Processing</Button>
                            <Button onClick={() => alert('Manufacturing Clicked')}>Manufacturing</Button>
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>

            {/* Outside Processing Dialog */}
            <Dialog open={openOutsideDialog} onOpenChange={() => setOpenOutsideDialog(false)}>
                <DialogContent>
                    <DialogHeader>Outside Processing</DialogHeader>
                    <form onSubmit={handleOutsideSubmit} className='flex flex-col gap-2'>
                        <div>
                            <label className='block'>Product Name</label>
                            <input
                                type="text"
                                value={productDetails.productName}
                                readOnly
                                className='border rounded p-1 w-full'
                            />
                        </div>
                        <div>
                            <label className='block'>Product Quantity</label>
                            <input
                                type="number"
                                value={productDetails.productQuantity}
                                readOnly
                                className='border rounded p-1 w-full'
                            />
                        </div>
                        <div>
                            <label className='block'>Quantity to Issue</label>
                            <input
                                type="number"
                                value={productDetails.quantity}
                                onChange={(e) =>
                                    setProductDetails({
                                        ...productDetails,
                                        quantity: Number(e.target.value)
                                    })
                                }
                                className='border rounded p-1 w-full'
                                required
                                min={1}
                                max={productDetails.productQuantity}
                            />
                        </div>
                        <Button type="submit" className='mt-2'>Submit</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default IssueProductDialog;
