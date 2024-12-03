import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function UpdateParticipant({ setParticipantUpdateOpen, eventId, participant }) {
    // console.log('teeeeeeeest', participant._id)
    // console.log('teeeeeeeest', eventId)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            city: "",
            email: "",
            phoneNumber: "",
        },
    })
    useEffect(() => {
        if (participant) {
            reset({
                firstName: participant.firstName || "",
                lastName: participant.lastName || "",
                city: participant.city || "",
                email: participant.email || "",
                phoneNumber: participant.phoneNumber || "",
            });
        }
    }, [participant, reset]);

    async function handleupdateparticipant(data) {
        try {
            let result = await axios.put(`http://localhost:3000/participents/${eventId}/${participant._id}`, data, {
                headers: {
                    'authorization': localStorage.getItem('UserToken')
                }
            });
            // console.log('this is from updaate',result.data);
            if (result.data) {
                toast.success('The user was updated successfully');
                setParticipantUpdateOpen(false)
            }


        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <Toaster position="bottom-right" />
            <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50" onClick={() => setParticipantUpdateOpen(false)} >
                <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded shadow-lg w-[60%] max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-center ">
                        <h2 className="text-xl font-bold mb-4">Update Participant</h2>
                    </div>
                    <form onSubmit={handleSubmit((data) => handleupdateparticipant(data))} className="space-y-4 p-6 max-w-md mx-auto rounded-lg shadow-lg">
                        <div>
                            <input defaultValue={participant?.firstName} {...register('firstName', { required: true, minLength: 3, maxLength: 20 })} placeholder="Fist Name" type="text" id="firstName" name="firstName" className="w-full p-2 border rounded" required />
                            {errors.firstName && <span>{errors.firstName.message}</span>}
                        </div>
                        <div>
                            <input defaultValue={participant?.lastName} {...register('lastName', { required: true, minLength: 3, maxLength: 20 })} placeholder="Fist Name" type="text" id="firstName" name="firstName" className="w-full p-2 border rounded" required />
                            {errors.lastName && <span>{errors.lastName.message}</span>}
                        </div>
                        <div>
                            <input defaultValue={participant?.phoneNumber} {...register('phoneNumber', { required: true, pattern: { value: /^\+\d{1,3}\d{6,14}$/, message: "the phone number should be moroccan starting with +(212)XXXYYYYYY" } })} placeholder="Phone Number" type="tel" id="phoneNumber" name="phoneNumber" className="w-full p-2 border rounded" required />
                            {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                        </div>
                        <div>
                            <input defaultValue={participant?.city} {...register('city', { required: true, minLength: 3, maxLength: 20 })} placeholder="City" type="text" id="city" name="city" className="w-full p-2 border rounded" required />
                            {errors.city && <span>{errors.city.message}</span>}
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="w-6/12 text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Update Participant
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}