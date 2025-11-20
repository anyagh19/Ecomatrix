import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Table, TableBody } from '@/components/ui/table';
import { storeProduct } from '@/models/store.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface IssueProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: storeProduct | null;
}

function IssueProductDialog({ isOpen, onClose, product }: IssueProductDialogProps) {
    const [openOutsideDialog, setOpenOutsideDialog] = useState(false);
    const [manufacturingDialog, setManufacturingDialog] = useState(false);

    const [productDetails, setProductDetails] = useState({
        productName: '',
        productQuantity: 0,
        quantity: 0
    });

    // Update local state when dialog opens with new product
    useEffect(() => {
        if (product) {
            setProductDetails({
                productName: product.itemName,
                productQuantity: product.itemQuantity,
                quantity: 0
            });
        }
    }, [product]);

    // ---------------------- OUTSIDE PROCESSING ----------------------

    const handleOutsideSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.put('/api/inventory/issue-to-outside-processing', {
                itemName: productDetails.productName,
                quantity: productDetails.quantity
            });

            // Update local store quantity
            if (res.status === 200 && product) {
                const updatedQuantity = productDetails.productQuantity - productDetails.quantity;

                await axios.put(`/api/inventory/update-item/${product._id}`, {
                    itemQuantity: updatedQuantity
                });
            }

            setOpenOutsideDialog(false);
        } catch (error) {
            console.error('Error issuing product:', error);
        }
    };

    // ---------------------- MANUFACTURING PROCESS ----------------------

    const handleManufactureSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Add quantity to final manufactured product
            const res = await axios.put('/api/manufactured-product/add-final-product', {
                productName: productDetails.productName,
                productQuantity: productDetails.quantity
            });

            if (res.status === 200 && product) {
                const updatedQuantity = productDetails.productQuantity - productDetails.quantity;

                // Reduce raw material stock
                await axios.put(`/api/inventory/update-item/${product._id}`, {
                    itemQuantity: updatedQuantity
                });
            }

            setManufacturingDialog(false);
        } catch (error) {
            console.error('Error manufacturing product:', error);
        }
    };

    return (
        <>
            {/* Main Dialog */}
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>Product History</DialogHeader>
                    <Table>
                        <TableBody className="flex gap-4">
                            <Button onClick={() => setOpenOutsideDialog(true)}>
                                Outside Processing
                            </Button>

                            <Button onClick={() => setManufacturingDialog(true)}>
                                Manufacturing
                            </Button>
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>

            {/* Outside Processing Dialog */}
            <Dialog open={openOutsideDialog} onOpenChange={setOpenOutsideDialog}>
                <DialogContent>
                    <DialogHeader>Issue to Outside Processing</DialogHeader>

                    <form onSubmit={handleOutsideSubmit} className="flex flex-col gap-2">
                        <div>
                            <label className="block">Product Name</label>
                            <input
                                type="text"
                                value={productDetails.productName}
                                readOnly
                                className="border rounded p-1 w-full"
                            />
                        </div>

                        <div>
                            <label className="block">Available Quantity</label>
                            <input
                                type="number"
                                value={productDetails.productQuantity}
                                readOnly
                                className="border rounded p-1 w-full"
                            />
                        </div>

                        <div>
                            <label className="block">Quantity to Issue</label>
                            <input
                                type="number"
                                value={productDetails.quantity}
                                onChange={(e) =>
                                    setProductDetails({
                                        ...productDetails,
                                        quantity: Number(e.target.value)
                                    })
                                }
                                className="border rounded p-1 w-full"
                                required
                                min={1}
                                max={productDetails.productQuantity}
                            />
                        </div>

                        <Button type="submit" className="mt-2">
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Manufacturing Dialog */}
            <Dialog open={manufacturingDialog} onOpenChange={setManufacturingDialog}>
                <DialogContent>
                    <DialogHeader>Manufacturing</DialogHeader>

                    <form onSubmit={handleManufactureSubmit} className="flex flex-col gap-2">
                        <div>
                            <label className="block">Product Name</label>
                            <input
                                type="text"
                                value={productDetails.productName}
                                readOnly
                                className="border rounded p-1 w-full"
                            />
                        </div>

                        <div>
                            <label className="block">Available Quantity</label>
                            <input
                                type="number"
                                value={productDetails.productQuantity}
                                readOnly
                                className="border rounded p-1 w-full"
                            />
                        </div>

                        <div>
                            <label className="block">Quantity to Manufacture</label>
                            <input
                                type="number"
                                value={productDetails.quantity}
                                onChange={(e) =>
                                    setProductDetails({
                                        ...productDetails,
                                        quantity: Number(e.target.value)
                                    })
                                }
                                className="border rounded p-1 w-full"
                                required
                                min={1}
                                max={productDetails.productQuantity}
                            />
                        </div>

                        <Button type="submit" className="mt-2">
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default IssueProductDialog;
