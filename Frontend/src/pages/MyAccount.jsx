import React from "react";
import BreadcrumbHero from "../components/Breadcrumb";
import Signup from "./Signup";
import Login from "./Login";

function MyAccount() {
    return (
        <div>
            <BreadcrumbHero title="My Account" image="/Breadcrumb/account.webp" />

            <div className=" py-16">
                <div className="max-w-6xl mx-auto px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <Login />

                        <Signup />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
