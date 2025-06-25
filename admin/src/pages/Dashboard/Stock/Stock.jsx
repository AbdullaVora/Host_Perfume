import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../../../redux/slices/Dashboard/product/productSlice";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StockModal from "../../../components/Stock/StockModel";


const Stock = () => {
    const [canEdit, setCanEdit] = useState(true);
    const [canDelete, setCanDelete] = useState(true);
    const [canActive, setCanActive] = useState(true);
    const [userId, setUserId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const dispatch = useDispatch();

    // State from Redux store
    const { products, loading: productsLoading, error } = useSelector(
        (state) => state.products
    );
    const { list } = useSelector((state) => state.subAdmins);
    const { users } = useSelector((state) => state.user);

    // Fetch data when component mounts
    useEffect(() => {
        dispatch(fetchSubAdmins());
        dispatch(getUsers());
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem("AdminId");
        setUserId(userId);
    }, []);

    // Check user permissions
    useEffect(() => {
        const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, "");
        const findUser = users.find((user) => String(user._id) === cleanUserId);

        if (findUser && findUser.role !== "super-admin") {
            const currentSubAdmin = list.find((sub) => sub.email === findUser.email);
            if (currentSubAdmin) {
                const permissions = currentSubAdmin.permissions?.products;
                setCanEdit(permissions?.edit ?? false);
                setCanDelete(permissions?.delete ?? false);
                setCanActive(permissions?.active ?? false);
            }
        }
    }, [list, users, userId]);

    console.log(products)

    const tableData = products.map((product) => {
        // Calculate total stock
        let totalStock = 0;
        let variantText = "No variants";

        if (product.variants && product.variants.variants && product.variants.variants.length > 0) {
            totalStock = product.variants.variants.reduce((total, variant) => total + (variant.stock || 0), 0);
            variantText = product.variants.variants
                .map(v => v.data && v.data[0] ? `${v.data[0].value} (${v.stock || 0})` : "")
                .filter(Boolean)
                .join(", ");
        }

        return {
            id: product._id,
            image: product.thumbnail,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            discount: `${product.discount}%`,
            stock: totalStock,
            status: product.status ? "Active" : "Inactive",
            variants: variantText,
            lastUpdated: new Date(product.updatedAt).toLocaleDateString(),
            isAction: true,
            isStock: true,
            // originalData: product
        };
    });
    // Action handlers
    const onEdit = (id) => {
        // Find the full product data from Redux state using the ID
        const fullProduct = products.find(p => p._id === id);
        if (fullProduct) {
            setSelectedProduct(fullProduct);
            setIsModalOpen(true);
        } else {
            toast.error("Product not found!");
        }
    };

    const onDelete = async (id) => {
        // Find the full product data from Redux state using the ID
        const fullProduct = products.find(p => p._id === id);
        if (!fullProduct) {
            toast.error("Product not found!");
            return;
        }

        if (window.confirm(`Are you sure you want to reset stock for ${fullProduct.name} to zero?`)) {
            try {
                // Create updated product data with stock set to 0
                const updatedVariants = fullProduct.variants.variants.map(variant => ({
                    ...variant,
                    stock: 0
                }));

                const updatedProduct = {
                    ...fullProduct,
                    variants: {
                        ...fullProduct.variants,
                        variants: updatedVariants
                    }
                };

                await dispatch(updateProduct({
                    id: fullProduct._id,
                    updatedData: updatedProduct
                })).unwrap();

                toast.success("Stock reset to zero successfully!");
                dispatch(fetchProducts()); // Refresh the list
            } catch (error) {
                toast.error(`Failed to reset stock: ${error.message}`);
            }
        }
    };

    const onStatus = async (id) => {
        // Find the full product data from Redux state using the ID
        const fullProduct = products.find(p => p._id === id);
        if (!fullProduct) {
            toast.error("Product not found!");
            return;
        }

        try {
            const updatedProduct = {
                ...fullProduct,
                status: !fullProduct.status
            };

            await dispatch(updateProduct({
                id: fullProduct._id,
                productData: updatedProduct
            })).unwrap();

            toast.success(`Product ${updatedProduct.status ? "activated" : "deactivated"} successfully!`);
            dispatch(fetchProducts()); // Refresh the list
        } catch (error) {
            toast.error(`Failed to update status: ${error.message}`);
        }
    };

    const handleStockUpdate = async (updatedStockData) => {
        try {
            // Create updated variants array
            const updatedVariants = selectedProduct.variants.variants.map(variant => {
                const updatedVariant = updatedStockData.variants.find(
                    v => v.id === variant.id
                );
                return updatedVariant ? { ...variant, stock: updatedVariant.stock } : variant;
            });

            // Prepare the updated product data
            const updatedProduct = {
                ...selectedProduct,
                variants: {
                    ...selectedProduct.variants,
                    variants: updatedVariants
                }
            };

            await dispatch(updateProduct({
                id: selectedProduct._id,
                updatedData: updatedProduct
            })).unwrap();

            toast.success("Stock updated successfully!");
            setIsModalOpen(false);
            dispatch(fetchProducts()); // Refresh the list
        } catch (error) {
            toast.error(`Failed to update stock: ${error.message}`);
        }
    };

    if (productsLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    return (
        <div className="flex bg-gray-100 custom-container">
            <div className="flex-1 flex flex-col">
                <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
                    <h1 className="text-2xl font-bold">Stock Management</h1>
                </header>
                <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
                    <div className="py-3">
                        <Table
                            data={tableData}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            canActive={canActive}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onStatus={onStatus}
                            searchable={true}
                            pagination={true}
                        />
                    </div>
                </div>
            </div>

            {/* Stock Edit Modal */}
            {isModalOpen && selectedProduct && (
                <StockModal
                    product={selectedProduct}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleStockUpdate}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default Stock;