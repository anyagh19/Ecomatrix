import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { storeProduct } from '@/models/store.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface productHistoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: storeProduct | null;
}

function ProductHistoryDialog({ isOpen, onClose, product }: productHistoryDialogProps) {
    const [products, setProducts] = useState<{ _id: string; userName: string; quantityAdded: number ;date: Date }[]>([])

    useEffect(() => {
        if (!isOpen || !product) return;
        const fetchProducts = async () => {
            const res = await axios.get(`/api/inventory/item-history/${product?._id}`)
            console.log("n", res.data)
            console.log('l', res.data.data)
            setProducts(res.data.data)
        }
        fetchProducts();
    }, [product])
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    Product History
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sr No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {products.map((p, i) => (
                        <TableRow key={p._id.toString()}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{p.userName}</TableCell>
                            <TableCell>{p.quantityAdded}</TableCell>
                            <TableCell>{new Date(p.date).toISOString().split('T')[0]}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    )
}

export default ProductHistoryDialog
