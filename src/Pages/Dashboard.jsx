import React, { useState } from "react";
import SideBar from "./Layouts/SideBar";
import { Toaster, toast } from "sonner";
import AddNewEvent from "../Components/Dashboard/addNewEvent";
import ShowEvents from "../Components/Dashboard/ShowEvents"

const tabs = [
    { id: "dashboard", title: "Dashboard", icon: "ti ti-home" },
    { id: "event", title: "My Event", icon: "ti ti-settings" },
    { id: "participants", title: "Participants", icon: "ti ti-user" },
];

function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        
        <div className="flex">
            <Toaster position="bottom-right" />
            <SideBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 p-8" style={{ marginLeft: "16rem" }}>
                {activeTab === "dashboard" && (
                    <h1 className="text-2xl font-bold">
                        Welcome to your {activeTab}:
                    </h1>
                )}
                {activeTab === "event" && (
                    <div>
                        <h1 className="text-2xl font-bold">
                            Let's check {activeTab} section!
                        </h1>
                        <div className="flex justify-end">
                            <button onClick={() => setIsModalOpen(true)} className="block text-white bg-orange-600 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                Add New Event
                            </button>
                        </div>
                        {isModalOpen && (
                            <>
                            <AddNewEvent setIsModalOpen={setIsModalOpen}/>
                            <ShowEvents/>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
