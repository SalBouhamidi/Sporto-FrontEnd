import axios from "axios";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { UserMinus } from "lucide-react"
import { useForm } from "react-hook-form";
export default function EventDetails({ id, onBack }) {
  const [eventDetails, setEventDetails] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange"})

  function validateDate(value) {
    let today = new Date();
    let Eventdate = new Date(value);
    if (Eventdate <= today) {
        return 'The date is not valid, please provide a valid date in the future';
    }
    return true;
}
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    async function getDetails() {
      try {
        let result = await axios.get(`http://localhost:3000/events/${id}`);
        if (result?.data) {
          setEventDetails(result?.data);
        }
      } catch (e) {
        console.log(e);
        toast.error('Please Try again')

      }
    }
    getDetails()

  }, [])
  async function removeParticipant(participantId) {
    console.log(id, participantId)
    console.log('tesst')
    try {
      let result = await axios.delete(`http://localhost:3000/participents/${id}/${participantId}`, {
        headers: {
          'authorization': localStorage.getItem('UserToken')
        }
      })
      // console.log('ther result ate', result.data);
      // toast.success('The user was removed successfully');
      // console.log('result.data:', result.data, 'pass param', participantId );
      // console.log('Participants array before removal:', prevState.participants);
      if (result.data === 'the participant was deleted successfully') {
        toast.success('The user was removed successfully');
        setEventDetails((prevState) => {
          return {
            ...prevState,
            participants: prevState.participants.filter((participant) => participant._id !== participantId )
          }

        })
      }

    } catch (e) {
      console.log(e);
    }
  }
  async function handleCreatingEvent(data, eventId){
    // console.log('this my data', data, 'this my id', eventId).
    try{
      let result = await axios.post(`http://localhost:3000/participents/${eventId}`, data, {
        headers: {
          'authorization': localStorage.getItem('UserToken')
        }
      })
      // console.log('my ressssssssssssssult',result);
      if(result?.data.message == "The participant was added successfully"){
        setEventDetails((prevState)=>{
          return {
            ...prevState, 
            participants: [...prevState.participants, data]
          }
        })
        toast.success(result?.data.message);
        setIsModalOpen(false)
      }else if (result?.data == "the user is already exist"){
        toast.error(result?.data)
      }

    }catch(e){
      toast.error(e?.response.data.message[0])
      console.log('ops smth bad happend', e)
    }
  }
  async function handleupdatingEvent(data, eventId){
    try{
      let result = await axios.put(`http://localhost:3000/events/${eventId}`, data, {
        headers: {
          'Authorization': localStorage.getItem('UserToken')
        }
      })
      console.log(result)
      toast.success('Event updated successfully')
    }catch(e){
        console.log(e);
        toast.error('Ops Something bad happend, kindly try again');
    }
  }

  return (
    <>
      <Toaster position="bottom-right" />
      {eventDetails && Object.keys(eventDetails).length > 0 && (
        <div>
          <div className="min-h-screen py-12 px-4 mt-5 rounded-md " style={{ background: "#fcf3e4" }}>
            <div className="flex justify-between">
            <button onClick={onBack} className="block text-white bg-orange-500 px-4 py-2 rounded mb-4">
              Back to Events
            </button>
            <div className="flex gap-3">
            <button onClick={()=>setModalUpdateOpen(true)} className="block text-white bg-orange-500 px-4 py-2 rounded mb-4">
              Update Event
            </button >
            <button className="block text-white bg-orange-500 px-4 py-2 rounded mb-4">
                list of participant
            </button>
            </div>
            </div>
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-8 ">{eventDetails.name}</h1>
            </div>
            <img src={"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80"} alt={eventDetails.name} className="w-full h-64 object-cover mb-4" />
            <p className="text-gray-600 mb-4">{eventDetails.description}</p>
            <p className="text-gray-600">Date: {eventDetails.date.split('T')[0]}</p>
            <div className="mt-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-4">Participants ({eventDetails.participants.length})</h3>
                <button onClick={() => setIsModalOpen(true)} className="block text-white bg-orange-600 px-4 py-2 rounded mb-4">
                  Add participant
                </button>
              </div>
              <div className="space-y-3">
                {eventDetails.participants.length === 0 ? (
                  <p className="text-gray-500 italic">No participants yet</p>
                ) : (
                  eventDetails.participants.map((participant) => (
                    <div key={participant._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium">{participant.firstName} {participant.lastName}</p>
                        <p className="text-sm text-gray-600">{participant.email}</p>
                        <p className="text-xs text-gray-500">Joined: {participant.phoneNumber}</p>
                      </div>
                      <button onClick={() => removeParticipant(participant._id)} className="text-red-600 hover:text-red-800 p-2" >
                        <UserMinus className="h-5 w-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)} >
              <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded shadow-lg w-[60%] max-h-[80vh] overflow-y-auto">
                <div className="flex justify-center ">
                  <h2 className="text-xl font-bold mb-4">Manage participant</h2>
                </div>
                <p className="mb-4">This is a simple modal example in React.</p>
                <div className="p-6 flex space-x-6 justify-evenly">
                  <div onClick={() => handleOptionChange(1)} className={`p-4 w-60 rounded-lg border-2 ${selectedOption === 1 ? 'border-orange-600' : 'border-gray-300'} cursor-pointer hover:shadow-lg transition`}>
                    <input type="checkbox" checked={selectedOption === 1} className="mr-2 hidden" />
                    <div className="font-semibold text-lg text-gray-700">Add New Participant</div>
                    <p className="text-sm text-gray-500 mt-2">Add a new participant and affect to your event</p>
                  </div>

                  <div onClick={() => handleOptionChange(2)} className={`p-4 w-60 rounded-lg border-2 ${selectedOption === 2 ? 'border-orange-600' : 'border-gray-300'} cursor-pointer hover:shadow-lg transition`}>
                    <input type="checkbox" checked={selectedOption === 2} className="mr-2 hidden" />
                    <div className="font-semibold text-lg text-gray-700">Affect new Participant</div>
                    <p className="text-sm text-gray-500 mt-2">Assign an existing participant to the event</p>
                  </div>
                </div>
                {selectedOption === 1 && (
                  <form onSubmit={handleSubmit((data)=>handleCreatingEvent(data, eventDetails._id))} className="space-y-4 p-6 max-w-md mx-auto rounded-lg shadow-lg">
                    <div>
                      <input {...register('firstName', { required: true, minLength: 3, maxLength: 20 })} placeholder="Fist Name" type="text" id="firstName" name="firstName" className="w-full p-2 border rounded" required/>
                      {errors.firstName && <span>{errors.firstName.message}</span>}

                    </div>
                    <div>
                      <input {...register('lastName', { required: true, minLength: 3, maxLength: 20 })} placeholder="Last Name" type="text" id="lastName" name="lastName" className="w-full p-2 border rounded" required/>
                      {errors.lastName && <span>{errors.lastName.message}</span>}
                    </div>
                    <div>
                      <input {...register('email', { required: true, pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address"}})} placeholder="Email" type="email" id="email" name="email" className="w-full p-2 border rounded" required/>
                      {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div>
                      <input {...register('phoneNumber', { required: true, pattern:{value: /^\+\d{1,3}\d{6,14}$/, message:"the phone number should be moroccan starting with +(212)XXXYYYYYY"}})} placeholder="Phone Number" type="tel" id="phoneNumber" name="phoneNumber" className="w-full p-2 border rounded" required/>
                      {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                    </div>
                    <div>
                      <input {...register('city', { required: true, minLength: 3, maxLength: 20 })}placeholder="City" type="text" id="city" name="city" className="w-full p-2 border rounded" required/>
                      {errors.city && <span>{errors.city.message}</span>}
                    </div>
                    <div className="flex justify-center">
                      <button type="submit" className="w-6/12 text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Add Participant
                      </button>
                    </div>
                  </form>

                )}
                {selectedOption === 2 && (
                  <p>test op 2</p>
                )

                }



                <button onClick={() => setIsModalOpen(false)} className="bg-orange-600 text-white px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </div>
          )}

          {isModalUpdateOpen && (
              <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50" onClick={() => setModalUpdateOpen(false)} >
              <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded shadow-lg w-[60%] max-h-[80vh] overflow-y-auto">
              <div className="flex justify-center ">
                  <h2 className="text-xl font-bold mb-4">Update Event</h2>
              </div>
              <div className="p-4 md:p-5">
                        <form onSubmit={handleSubmit((data)=>handleupdatingEvent(data, eventDetails._id))} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-orange-600 dark:text-white" >
                                    Name:
                                </label>
                                <input {...register('name', { required: true, minLength: 3, maxLength: 20,  defaultValue: eventDetails.name})}  type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white" placeholder="Enter the name of your Event" required />
                                {errors.name && <span>{errors.name.message}</span>}

                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-orange-600 dark:text-white" >
                                    Description:
                                </label>
                                <input {...register('description', { required: true, minLength: 3, maxLength: 30, defaultValue: eventDetails.description })}  type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white" placeholder="Enter the description of your Event" required />
                                {errors.description && <span>{errors.description.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-orange-600 dark:text-white" >
                                    Date:
                                </label>
                                <div className="relative ">
                                    <input type="date" id="date"  {...register('date', { required: true, validate: validateDate, valueAsDate: true, defaultValue: eventDetails.date })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-orange-600 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white" placeholder="Select date" />
                                    {errors.date && <span className="text-black">{errors.date.message}</span>}

                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="w-6/12 text-white bg-orange-600 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-600">
                                    Update Event
                                </button>
                            </div>
                        </form>
                    </div>
              </div>
              </div>
          )}







        </div>


      )}
    </>

  )
}
