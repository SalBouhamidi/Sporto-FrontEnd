import CardComponent from "./CardComponent"
import { Toaster, toast } from "sonner"
import { useState} from 'react';

export default function ShowEvents({events, setEvents, setSelectedEvent}) {
    const [Maketoast, setMakeToast] = useState('');

    if(Maketoast !== ''){
        toast.success(Maketoast);
        setMakeToast('');
    }

    return (
        <>
        {Maketoast !== undefined ? <Toaster position="bottom-right" /> : null}
            <div className="min-h-screen py-12 px-4 mt-5 rounded-md" style={{ background: "#fcf3e4" }}>
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Upcoming Events</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* <CardComponent key="1" title="test" date="67-67-77" description="sjsjsjsj" imageUrl="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80" /> */}
                        {events.length > 0 ? events.map((event) => (
                            <CardComponent
                                key={event._id}
                                id={event._id}
                                title={event.name}
                                date={event.date.split('T')[0]}
                                imageUrl={"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80"}
                                description={event.description}
                                setMakeToast={setMakeToast}
                                setEvents={setEvents}
                                onViewDetails={() => setSelectedEvent(event._id)}
                            />
                        ))
                        :
                        <div className="flex justify-center"><p>No event yet! Start your journey with your first event</p></div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}