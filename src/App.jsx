import { useState, useEffect } from 'react'
import NavBar from './components/navbar'
import Footer from './components/Footer'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// import './App.css'



function App() {
  const [allFields, setAllFields] = useState(false);

  const [toDo, setToDo] = useState("")
  const [toDoDescription, setToDoDescription] = useState("")
  const [toDoDate, setToDoDate] = useState("")
  const [toDoPriority, setToDoPriority] = useState("Low")

  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")

  const [toDos, setToDos] = useState([])


  useEffect(() => {
    let toDossStrings = localStorage.getItem("toDos");
    if(toDossStrings){
      let toDoss = JSON.parse(localStorage.getItem("toDos"))
      setToDos(toDoss);
    }
  }, [])
  

  const saveToLS =() => {
    localStorage.setItem("toDos", JSON.stringify(toDos))
  }


  const handleAllFields = () => {
    setAllFields(!allFields);
  }

  const handleChangeToDo = (e) => {
    setToDo(e.target.value)
  }
  const handleChangeToDoDescription = (e) => {
    setToDoDescription(e.target.value)
  }
  const handleChangeToDoDate = (e) => {
    setToDoDate(e.target.value)
  }
  const handleChangeToDoPriority = (e) => {
    setToDoPriority(e.target.value)
  }

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }
  const handlePriority = (e) => {
    setPriority(e.target.value)
  }

  const handleAdd = () => {
    setToDos([...toDos, {id: uuidv4(), toDo, toDoDescription, toDoDate, toDoPriority, isCompleted: false }])
    saveToLS();
    setToDo("")
    setToDoDescription("")
    setToDoDate("")
    setToDoPriority("Low")
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = toDos.findIndex(item => {
      return item.id === id;
    })
    let newToDos = [...toDos];
    newToDos[index].isCompleted = !newToDos[index].isCompleted;
    setToDos(newToDos);
    saveToLS();
  }
  

  const handleEdit = (e, id) => {
    let t = toDos.filter(i=>i.id ===id)
    setToDo(t[0].toDo)
    setToDoDescription(t[0].toDoDescription)
    setToDoDate(t[0].toDoDate)
    setToDoPriority(t[0].toDoPriority)
    setAllFields(true)

    let newToDos = toDos.filter(item => {
      return item.id != id;
    })
    setToDos(newToDos)
    saveToLS();
    window.scrollTo(0,90)
  }

  const handleDelete = (e, id) => {
    let newToDos = toDos.filter(item => {
      return item.id != id;
    })
    setToDos(newToDos)
    saveToLS();
  }




  return (
    <>
      <NavBar />

      <main className="md:container bg-gray-700 min-h-[80vh] md:max-w-[60vw] mx-auto p-5 rounded-2xl flex flex-col gap-6 my-[70px]">
        <div className='flex justify-center'>
          <h1 className='font-bold text-xl'>MyToDo - Manage Your Task</h1>
        </div>

        <div className='flex flex-col gap-2 relative'>
          <div className="absolute right-0 scale-75">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer my-4" onClick={handleAllFields}>{allFields ? "Hide Fields" : "Show All Fields"}</button>
          </div>

          <div className="m-5"></div>

          <div className="my-3">
            <span className="font-bold text-xl">Add To-Do's :</span>
          </div>

          <label htmlFor="taskName">Enter the task name :</label>
          <input onChange={handleChangeToDo} value={toDo} type="text" id='taskName' name='taskName' placeholder='Name of the Task' className="bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />

          {allFields && (
            <div className='flex flex-col gap-2'>
              <label htmlFor="description">Description :</label>
              <textarea onChange={handleChangeToDoDescription} value={toDoDescription} id='description' name='description' placeholder='Task description' className="bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-18 overflow-auto" />
              <div className='flex gap-4 justify-center items-center'>
                <div className='flex flex-col gap-2 w-1/2'>
                  <label htmlFor="deadline">Deadline :</label>
                  <input onChange={handleChangeToDoDate} value={toDoDate} type="date" id='deadline' name='deadline' placeholder='date' className="bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
                </div>

                <div className='flex flex-col gap-2 w-1/2'>
                  <label htmlFor="pirority" className="block text-sm font-medium text-white mb-1">Pirority</label>
                  <select onChange={handleChangeToDoPriority} value={toDoPriority} id="pirority" name="pirority" className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>)
          }
          <button disabled={toDo.length<=3} className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer my-4" onClick={handleAdd}>Add</button>
        </div>

        <div className='flex flex-col w-full gap-3'>
          <h2 className='font-bold text-xl'>Filters :</h2>
          <div className='flex w-full gap-6 flex-wrap'>
            <div className='flex justify-center items-center gap-2 w-auto'>
              <label htmlFor="Completed" className="block text-sm font-medium text-white mb-1 w-[80px]">Status :</label>
              <select onChange={handleStatus} value={status} id="Completed" name="Completed" className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className='flex justify-center items-center gap-2 w-auto'>
              <label htmlFor="priority" className="block text-sm font-medium text-white mb-1 w-[100px]">Priority :</label>
              <select onChange={handlePriority} value={priority} id="priority" name="priority" className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='font-bold text-xl'>To-Do's :</h1>
          </div>
          <div className='flex flex-col gap-5'>
            {toDos.length === 0 && <div className='m-5'>No To-Do's to display.</div>}
            {toDos.map(item => {
              return ((status === "All" && priority === "All") || (status === "All" && priority === item.toDoPriority) || (status === (item.isCompleted?"Completed":"Active") && priority === "All") || (status === (item.isCompleted?"Completed":"Active") && priority === item.toDoPriority)) && (
                <div key={item.id} className={'flex rounded-xl p-4 justify-between ' + ((item.toDoPriority==="Low")?'bg-teal-800':((item.toDoPriority==="Medium")?'bg-yellow-800':'bg-rose-800'))}>
                  <div className='flex justify-center items-center gap-5'>
                    <div>
                      <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                    </div>
                    <div>
                      <h2 className={'font-bold text-xl ' + ((item.toDoPriority==="Low")?'text-teal-400':((item.toDoPriority==="Medium")?'text-yellow-400':'text-rose-400'))}>{item.toDoPriority}</h2>
                      <h3 className={'font-bold' + (item.isCompleted ? ' line-through' : '')}>{item.toDo}</h3>
                      <div>
                        <p className={'' + (item.isCompleted ? ' line-through' : '')}>{item.toDoDescription}</p>
                        <p className={'' + (item.isCompleted ? ' line-through' : '')}>{item.toDoDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-3'>
                    <button onClick={(e) => {handleEdit(e, item.id)}} className='cursor-pointer'><FaEdit /></button>
                    <button onClick={(e) => {handleDelete(e, item.id)}} className='cursor-pointer'><MdDelete /></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />

    </>
  )
}

export default App
