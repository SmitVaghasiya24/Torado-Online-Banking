import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function AddMortgageRate() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mortgage_type: "",
        rate: "",
        apr: "",
        point: "",
        monthly_payment: "",
    });

    const authData = JSON.parse(localStorage.getItem("adminData"));
    const token = authData?.token;

    const handleChange = (e) => {
        const { name, value } = e.target;

        const cleanValue =
            name !== "mortgage_type"
                ? value.replace(/[^0-9.]/g, "")
                : value;

        setFormData((prev) => ({
            ...prev,
            [name]: cleanValue,
        }));
    };

    const handleSubmit = async () => {
        const {
            mortgage_type,
            rate,
            apr,
            point,
            monthly_payment,
        } = formData;

        if (
            !mortgage_type ||
            !rate ||
            !apr ||
            !point ||
            !monthly_payment
        ) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/admin/add_mortgage_rate",
                {
                    mortgage_type,
                    rate: Number(rate),
                    apr: Number(apr),
                    point: Number(point),
                    monthly_payment: Number(monthly_payment),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Mortgage rate added successfully");
            navigate("/admin/mortgage-rate");

            setFormData({
                mortgage_type: "",
                rate: "",
                apr: "",
                point: "",
                monthly_payment: "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to add mortgage rate");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
            <Card className="w-full max-w-4xl rounded-2xl shadow-sm">
                <CardHeader className="pb-6">
                    <CardTitle className="text-3xl">
                        Add Mortgage Rate
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">
                    <div className="space-y-2">
                        <Label>Mortgage Type</Label>
                        <Input
                            name="mortgage_type"
                            value={formData.mortgage_type}
                            onChange={handleChange}
                            placeholder="e.g. 15-Year Fixed"
                            className="h-11"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label>Rate (%)</Label>
                            <Input
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                placeholder="3.00"
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>APR (%)</Label>
                            <Input
                                name="apr"
                                value={formData.apr}
                                onChange={handleChange}
                                placeholder="6.02"
                                className="h-11"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label>Points</Label>
                            <Input
                                name="point"
                                value={formData.point}
                                onChange={handleChange}
                                placeholder="6.102"
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Monthly Payment</Label>
                            <Input
                                name="monthly_payment"
                                value={formData.monthly_payment}
                                onChange={handleChange}
                                placeholder="1100"
                                className="h-11"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-10 h-11 cursor-pointer bg-black text-white"
                        >
                            {loading ? "Saving..." : "Add Mortgage Rate"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="h-11 px-8 cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddMortgageRate;
