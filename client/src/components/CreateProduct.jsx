import axios from 'axios'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getCategories } from '@/redux/actions';
import { useEffect } from 'react';

const validate=(form)=> {
    let error = {};
    
    if (!form.name) {
        error.name = "enter name";
    }
    
   
    if (!form.manufacturer) {
        error.manufacturer = "enter info";
    }
    if (!form.origin) {
        error.origin = "enter info"
    }
    if (!form.price) {
        error.price = "enter info"
    }
    if (!form.discount) {
        error.discount = "enter info"
    }
    if (!form.stock) {
        error.stock = "enter info"
    }
    return error;
  }
  



export default function CreateProduct({onClose}) {
  const dispatch = useDispatch();

    
            
    useEffect(() => {
    
    (dispatch(getCategories()));
      }, []);
    const categories = useSelector(state=>state.categories)
    console.log(categories)
  
  
 
  const [form, setForm] = useState({
    name:"",
    description:"",
    manufacturer: "",
    origin: "",
    price:"",
    discount:0,
    stock: 0,
    isActive:false,//fata input
    category:"",
    images:[],
    
  })
   const [error,setError]= useState({})

  const imagesHandler = (event)=>{
    event.preventDefault();
    const imagesUrl={url:event.target.value}
    setForm({
        ...form,
        images: [...form.images, imagesUrl],
      })

  }
  const categoryHandler = (event)=>{
    
    const category = event.target.value;
    setSelectedCategory(category);

    // Buscar las subcategorías correspondientes a la categoría seleccionada
    const selectedCategoryObj = categories.find((cat) => cat.name === category);
    const subcategories = selectedCategoryObj?.subcategories || [];
    setSelectedSubcategory(subcategories[0]?.name || '');

  }


  

 
 
   

  const onChangeHandler =(event)=>{
    
  //  console.log(event.target.name)
  setError(
    validate({
      ...form, [event.target.name]: event.target.value
    })
  )
  
   setForm({
    ...form, [event.target.name]: event.target.value
   })
  }
  const onSubmithandler=(event)=>{
    event.preventDefault();
    console.log(form)
    if(Object.keys(error).length)
      return alert('missing info')
      
   
    
    axios.post("http://localhost:3001/products/create",form)
    .then(res=>alert(res.data))
    .catch(error=>alert("asdfgh"))
    
    }
    
  

    return (
        <form onSubmit={onSubmithandler}>
     {/* <form action="/products/create" method="POST" encType="multipart/form-data" onSubmit={onSubmithandler}>  */}
        <button onClick={onClose}>X</button>
        <div>
            <div>
                <div>
                    <input placeholder='Enter New Product...'type="text" value={form.name} onChange={onChangeHandler} name='name'/>
                    {error.name ? (<p>{error.name}</p>) : ""}
                </div>

                <div>
                    <input placeholder='description...'type="textarea" value={form.description} onChange={onChangeHandler} name='description'/>
                    {error.description ? (<p>{error.description}</p>) : ""}
                </div>

                <div>
                    <input placeholder='manufacturer...'type="text" value={form.manufacturer} onChange={onChangeHandler} name='manufacturer'/>      
                </div>

                <div>
                    <input placeholder='origin...'type="text" value={form.origin} onChange={onChangeHandler} name='origin'/>
                    {error.origin ? (<p>{error.origin}</p>) : ""}
                
                </div>
                
                <div>
                    <input placeholder='price...'type="text" value={form.price} onChange={onChangeHandler} name='price'/>
                    {error.price ? (<p>{error.price}</p>) : ""}
                </div>
                
                <div>
                    <input placeholder='discount...'type="text" value={form.discount} onChange={onChangeHandler} name='discount'/>
                    {error.discount ? (<p>{error.discount}</p>) : ""}
                </div>

                <div>
                    <input placeholder='stock...'type="text" value={form.stock} onChange={onChangeHandler} name='stock'/>
                    {error.stock ? (<p>{error.stock}</p>) : ""}
                </div>
            
        
                <div>
                    <select name="category"   onChange={onChangeHandler}>
                        <option value='select'>
                            SELECT CATEGORY
                        </option>
                        {categories.map(cat => 
                            <option name={cat.name} value={cat.categoryId}>
                                {cat.name}
                               
                            </option>
                        )}
                    </select>
                   
                </div>
                <div>
                    <label htmlFor="images">Images:</label>
                    <input placeholder='Enter URL...'type="text" value={form.images} onChange={imagesHandler} name='images'/>
                   
                </div>
            </div>
            <div>
                <button  type='submit'>SUBMIT</button>
            </div>
        </div>
    </form>
  )
}