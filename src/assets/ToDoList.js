import React, { useState, useEffect} from 'react';
import './ToDoList.css'
import image from './img/imagem.png'
function ToDoList(){
    const listaStorage =localStorage.getItem('lista');
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("")

   

    useEffect(()=>{
        localStorage.setItem('lista', JSON.stringify(lista));
    },[lista])


    function adcionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        } setLista([...lista, {text: novoItem, isCompleted: false}])
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }



    return(
        <div>
            <h1>Lista de tarefas</h1>
            <form onSubmit={adcionaItem}>
                <input id="input-entrada"
                 value={novoItem}
                 onChange={(e)=>{setNovoItem(e.target.value)}} 
                 type="text" placeholder="Adcione uma tarefa"
                 />
                <button className='add' type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                <div className='img-list-container'>
                {
                   lista.length < 1 ? <img id='img-list' src ={image}/> :
                   lista.map((item,index)=>(
                     <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                        <span onClick={()=>{clicou(index)}}>{item.text}</span>
                        <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                     </div>
                   ))

                  }
                  {
                    lista.length > 0 && <button onClick={()=>{deletaTudo()}} className="deleteAll">Deletar Todas</button> 
                  }
                 </div>
                
               
            </div>
        </div>
    )
}   

export default ToDoList;