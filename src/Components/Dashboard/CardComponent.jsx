import React from 'react';
import { Calendar, Eye, Trash2 } from 'lucide-react';
import { useState} from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

export default function CardComponent({ id, title, description, date, imageUrl, setMakeToast, setEvents, onViewDetails }) {
    const [deletModal, setDeletModal] = useState(false);
    async function DeleteEvent(){
        let result = await axios.delete(`http://localhost:3000/events/${id}`, {
            headers:{
                'authorization': localStorage.getItem('UserToken')
            }
        });
        if(result?.data == "Event deleted successfully"){
            setMakeToast('Event deleted successfully');
            setDeletModal(false);
        }
        setEvents((prevState) => prevState.filter((event) => event._id !== id));
    }
    return (
        <>
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:scale-105">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
            <div className="p-6">
                <h2 className="font-bold text-xl mb-3 text-gray-800">{title}</h2>
                <p className="text-gray-600 text-sm mb-4">{description}</p>
                <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{date}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
                <button onClick={onViewDetails}  className="flex items-center px-3 py-2 text-sm font-medium text-orange-600  hover:text-orange-500">
                    <Eye className="h-4 w-4 mr-1 hover:shadow-md" />
                    Details
                </button>
                <button onClick={() => setDeletModal(true)}  className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                </button>
                {deletModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">
                            Are you sure you want to delete this event?
                        </h2>
                        <div className="flex justify-end space-x-4">
                            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded" onClick={() => setDeletModal(false)}>
                                No
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded" onClick={DeleteEvent}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
        </>
    );
}


