import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function UpdateMortgageRate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        mortgage_type: "",
        rate: "",
        apr: "",
        point: "",
        monthly_payment: "",
        status: "approved",
    });

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    /* ================= Fetch by ID ================= */
    const fetchMortgageRate = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/admin/get_mortgage_rate_id/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.success) {
                const data = res.data.data;

                setFormData({
                    mortgage_type: data.mortgage_type || "",
                    rate: data.rate?.toString() || "",
                    apr: data.apr?.toString() || "",
                    point: data.point?.toString() || "",
                    monthly_payment: data.monthly_payment?.toString() || "",
                    status: data.status || "approved",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch mortgage rate");
        }
    };

    useEffect(() => {
        fetchMortgageRate();
    }, [id]);

    /* ================= Handlers ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;

        const cleanValue =
            name !== "mortgage_type" && name !== "status"
                ? value.replace(/[^0-9.]/g, "")
                : value;

        setFormData((prev) => ({
            ...prev,
            [name]: cleanValue,
        }));
    };

    /* ================= Update ================= */
    const handleSubmit = async () => {
        const {
            mortgage_type,
            rate,
            apr,
            point,
            monthly_payment,
            status,
        } = formData;

        if (
            !mortgage_type ||
            rate === "" ||
            apr === "" ||
            point === "" ||
            monthly_payment === ""
        ) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            await axios.put(
                `http://localhost:5000/api/admin/update_mortgage_rate/${id}`,
                {
                    mortgage_type,
                    rate: Number(rate),
                    apr: Number(apr),
                    point: Number(point),
                    monthly_payment: Number(monthly_payment),
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Mortgage rate updated successfully");
            navigate("/admin/mortgage-rate");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update mortgage rate");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-4xl rounded-3xl shadow-lg">
                <CardHeader className="pb-6">
                    <CardTitle className="text-3xl font-semibold">
                        Update Mortgage Rate
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="space-y-3">
                        <Label className="text-base">
                            Mortgage Type
                        </Label>
                        <Input
                            name="mortgage_type"
                            value={formData.mortgage_type}
                            onChange={handleChange}
                            placeholder="e.g. 15-Year Fixed"
                            className="h-12 text-base"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label className="text-base">
                                Rate (%)
                            </Label>
                            <Input
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                placeholder="3.00"
                                className="h-12 text-base"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-base">
                                APR (%)
                            </Label>
                            <Input
                                name="apr"
                                value={formData.apr}
                                onChange={handleChange}
                                placeholder="6.02"
                                className="h-12 text-base"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label className="text-base">
                                Points
                            </Label>
                            <Input
                                name="point"
                                value={formData.point}
                                onChange={handleChange}
                                placeholder="6.102"
                                className="h-12 text-base"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-base">
                                Monthly Payment
                            </Label>
                            <Input
                                name="monthly_payment"
                                value={formData.monthly_payment}
                                onChange={handleChange}
                                placeholder="1100"
                                className="h-12 text-base"
                            />
                        </div>
                    </div>

                    {/* STATUS */}
                    <div className="space-y-3">
                        <Label className="text-base">
                            Status
                        </Label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full h-12 rounded-md border px-3 text-base outline-none cursor-pointer"
                        >
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="h-12 px-10 text-base cursor-pointer bg-black text-white"
                        >
                            {loading ? "Updating..." : "Update Mortgage Rate"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="h-12 px-10 text-base cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default UpdateMortgageRate;
