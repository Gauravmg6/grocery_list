import React, { Fragment, useEffect, useState } from 'react'
import {MdOutlineDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'


const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list){
    console.log(list)
    return (list=JSON.parse(localStorage.getItem('list')))
  }else{
    return [];
  }
}

const succ = {msg:'Items Added',status: 'success'}
const del = {msg:'Item Removed', status: 'danger'}
const span = {msg:'Please Enter Value',status: 'danger'}

function App() {

  const [isEditing,setIsEditing] = useState(false)
  const [editID,setEditID] = useState(null)
  const [item,setItem] = useState(getLocalStorage)
  const [name,setName] = useState('')
  const [status,setStatus] = useState('')

  function message(){
    document.getElementById('span').innerHTML=this.msg;
    setStatus(this.status)
    setTimeout(()=> document.getElementById('span').innerHTML='',2000)
    setTimeout(()=> setStatus(''),2000)
  }

  const handleClick = (e) => { 
    e.preventDefault();
    if(name===''){
      message.call(span)
    }else if(name && isEditing){
      setItem(
        item.map((item)=>{
          if(item.id===editID){
            return ({...item,title:name})
          }
          return item
        })
      )
      setName('')
      setIsEditing(false)
      setEditID(null)
    }else{
      message.call(succ)
      const num = {id:new Date().getTime().toString(), title:name};
      setItem([...item,num])
      setName('')
      setIsEditing(false)
    }
  }

  const delItem = (thing) => {
    setItem(item.filter((a)=> a.title!==thing))
    message.call(del)
  }

  const editItem = (id) => {
    const newEdit = item.find((item)=> item.id === id)
    if(newEdit){
      setIsEditing(true)
      setName(newEdit.title)
      setEditID(id)
    }
  }

  const cancelItem = () => {
    setItem([])
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(item))
  },[item]) 

  return (
    <Fragment>
      <section>
        <div className='div'>
          <span className={status} id='span'></span>
          <h3>Grocery Bud</h3>
          <form className='form' onSubmit={handleClick}>
            <input onChange={(e)=> setName(e.target.value)} name='text' value={name} type="text" placeholder='e.g. eggs' />
            <button type='submit'>{isEditing?'Edit':'Submit'}</button>  
          </form>
          {item.map((thing,index)=>{
            return (
              <div key={index} className='items'>
                <h4>{thing.title}</h4>
                <div>
                  <button onClick={()=> editItem(thing.id)} className='ramp'><FaEdit /></button>
                  <button onClick={()=> delItem(thing.title)} className='ramp'><MdOutlineDelete /></button>
                </div>
              </div>
            )
          })}
          {item.length > 0 ? <button className='btn' onClick={cancelItem}>Clear items</button> : ''}
        </div> 
      </section>
    </Fragment>
  );
}

export default App;
