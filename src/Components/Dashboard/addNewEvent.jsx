import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
export default function AddNewEvent({ setIsModalOpen, setEvents }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", })
    function validateDate(value) {
        let today = new Date();
        let Eventdate = new Date(value);
        if (Eventdate <= today) {
            return 'The date is not valid, please provide a valid date in the future';
        }
        return true;
    }
    async function handleCreatingEvent(data) {
        try {
            let result = await axios.post('http://localhost:3000/events/create', data, {
                headers: {
                    Authorization: localStorage.getItem('UserToken')
                }
            })
            console.log(result);
            if (result?.data == "The date is invalid ") {
                toast.error('date is not valid')
            } else {
                setIsModalOpen(false);
                console.log(data);
                const formattedData = {
                    ...data,
                    date: new Date(data.date).toISOString(),
                };
    
                setEvents((prevState) => [...prevState, formattedData]);
                return toast.success('your event was made successfully')
            }

        } catch (e) {
            console.log(e);
            return "Ops Something went wrong"
        }
    }
    return (
        <>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md rounded-lg shadow " style={{ background: "#fcf3e4" }}>
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-orange-500 rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-orange-600 dark:text-white">
                            Add New Event
                        </h3>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="text-orange-500 bg-transparent hover:bg-orange-600 hover:text-lime-50 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">
                                Close modal
                            </span>
                        </button>
                    </div>
                    
                    <div className="p-4 md:p-5">
                        <form onSubmit={handleSubmit(handleCreatingEvent)} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-orange-600 dark:text-white" >
                                    Name:
                                </label>
                                <input {...register('name', { required: true, minLength: 3, maxLength: 20 })} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white" placeholder="Enter the name of your Event" required />
                                {errors.name && <span>{errors.name.message}</span>}

                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-orange-600 dark:text-white" >
                                    Description:
                                </label>
                                <input {...register('description', { required: true, minLength: 3, maxLength: 30 })} type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white" placeholder="Enter the description of your Event" required />
                                {errors.description && <span>{errors.description.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-orange-600 dark:text-white" >
                                    Date:
                                </label>
                                <div className="relative max-w-sm">
                                    <input type="date" id="date"  {...register('date', { required: true, validate: validateDate, valueAsDate: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white" placeholder="Select date" />
                                    {errors.date && <span className="text-black">{errors.date.message}</span>}

                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="w-6/12 text-white bg-orange-600 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-600">
                                    Create the Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}