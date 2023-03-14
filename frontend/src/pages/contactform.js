// import React, { useState } from 'react'
// import axios from 'axios'

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   })

//   const handleChange = e => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async e => {
//   //   e.preventDefault()

//   //   // axios.defaults.headers.post['Content-Type'] = 'application/json'
//   //   //console.log(formData)
//   //   axios
//   //     .post('http://localhost:1337/api/contact-forms', {data:formData})
//   //     .then(response => {
//   //       console.log(response)
//   //     })
//   //     .catch(error => {
//   //       console.log(error)
//   //     })
//   // }


//   e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:1337/api/contact-forms", {data:formData});
//       if (response.status === 200) {
//         //alert("Form submitted successfully!");
//         setFormData({ name: "", email: "", message: "" }); // Reset the form fields
//       } else {
//         throw new Error("Form submission failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Form submission failed");
//     }
//   }; 



//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="message">Message</label>
//         <textarea name="message" id="message" value={formData.message} onChange={handleChange}></textarea>
//       </div>
//       <div>
//       <label for="poster">Choose an image:</label>
//       <input type="media"
//        name="cover" id="cover" value={formData.cover} onChange={handleChange} 
//        accept="image/png, image/jpeg"/>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

// export default ContactForm





import React, { useState } from "react"
import axios from "axios"



const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    cover: null
  })

  const handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.type === 'file' ? target.files[0] : target.value
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('data', JSON.stringify(form))
    formData.append('files.cover', form.cover)

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:1337/api/contact-forms",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      console.log(response)
      setForm({
        name: "",
        email: "",
        message: "",
        cover: null
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={form.name} onChange={handleInputChange} required />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" value={form.email} onChange={handleInputChange} required />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" value={form.message} onChange={handleInputChange} required />

      <label htmlFor="cover">Cover Image</label>
      <input type="file" id="cover" name="cover" accept="image/*" onChange={handleInputChange} />

      <button type="submit">Submit</button>
    </form>

    

    </>

  )
}

export default ContactForm






// This is just an example code for the flow for input for blog from user


// import React, { useState } from "react"
// import { navigate } from "gatsby"
// import Image from "gatsby-image"
// import axios from "axios"
// import { IKUpload } from "imagekitio-react"

// const BlogForm = () => {
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [slug, setSlug] = useState("")
//   const [image, setImage] = useState(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // Upload the image to ImageKit.io
//     const response = await axios.post("https://upload.imagekit.io/api/v1/files/upload", image, {
//       headers: {
//         "Content-Type": image.type,
//         "Authorization": "your_imagekitio_secret_key"
//       }
//     })

//     // Store the blog post in Strapi
//     await axios.post("https://your-strapi-backend-url.com/posts", {
//       title,
//       description,
//       slug,
//       image: response.data.url
//     })

//     // Redirect to the blog post page
//     navigate(`/blog/${slug}`)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Title:
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//       </label>
//       <label>
//         Description:
//         <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//       </label>
//       <label>
//         Slug:
//         <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
//       </label>
//       <label>
//         Image:
//         <IKUpload
//           fileName={file => file.name}
//           folder="your_imagekitio_folder"
//           publicKey="your_imagekitio_public_key"
//           onError={err => console.log(err)}
//           onSuccess={res => setImage(res)}
//         />
//       </label>
//       {image && <Image fluid={image} />}
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

// export default BlogForm
