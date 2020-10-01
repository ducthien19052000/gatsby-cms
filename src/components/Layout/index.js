import React, { useState } from 'react'
import {Container,Row,Col, Card, Button, DropdownButton, Dropdown, Form, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { CgCloseO } from "react-icons/cg";
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

const Layout = ({category,posts,onRemovePost,onRemoveCate,onAddCate}) => {

       
    const [titleCate,setTitleCate] = useState("Select Cate")
    const [postAll,setPosts]= useState(posts)
    const [postDetail,setPostDetail] = useState({})
    const [show,setShow]=useState(false);
    const [showAddCate,setShowCate]=useState(false);
    const [validated, setValidated] = useState(false);
    const [newCatePost,setNewCatePost]=useState({})


    const onClickShowAll=()=>{
            setTitleCate("All post")
            setPosts(posts)
    }
    const onHandleChangeAddCate=(e)=>{
      const {name}=e.target;
    
      setNewCatePost({...newCatePost,[name]: e.target.value}) 
    }
    const onHandleAddCate=(e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      else{
        e.preventDefault();
        setValidated(true);
        setShowCate(false);
        onAddCate({ id: Math.random().toString(36).substr(2, 9),...newCatePost})
      }
   
    }
    const onHandleClick=(id)=>{
            const data = posts.filter(post => post.cateId===id);
            const title = category.filter(cate => cate.id===id)
            setTitleCate(title[0].name)
            setPosts(data)
        
          
    }

    const onHandleDeleteCate=(id)=>{
          onRemoveCate(id)
          const data= postAll.filter(post=>post.cateId!==id);
          setPosts(data)
    }

    const onHandleShowDetail=(id)=>{
        setShow(true);
            const data = posts.filter(post => post.id ===id);
            setPostDetail(data[0])
    }
    const onHandleDeletePost=(id)=>{
        onRemovePost(id)
        const data=  postAll.filter(post=>post.id !==id);
        setPosts(data)
        
    }
    return (
        <>
            <Container>
            <Row className="row-head">
                <Col className="Header-title">Your Name</Col>
                <DropdownButton className="dropdown-basic-button" title={titleCate}>
                <Dropdown.Item  onClick={onClickShowAll} >All post</Dropdown.Item>

                    {category.map((cate,index)=>(
                      <>
                <Dropdown.Item key ={index} onClick={()=>onHandleClick(cate.id)}  className="cate-post">{cate.name}
              
                </Dropdown.Item>  
                <Button className="delete-cate" onClick={()=>onHandleDeleteCate(cate.id)}><CgCloseO/></Button></>
                    ))}                
                </DropdownButton>
                <Button onClick={()=>setShowCate(true)}>Thêm Danh mục </Button>
            </Row>
            
            <Row className="post-blog">
              <>
                {Object.keys(category).length===0?
                <></>:
                <Row>
                <Button onClick={()=>setShowCate(true)} style={{margin:'15px'}}>Thêm Post </Button>
                </Row>  
              }
              </>
                <Row>
                <Col>
             
                
             {postAll.map((post,index)=>(
                  <Card style={{ width: '20rem' }} className="blog-item" key={index}>
                          
                  <Card.Body>
                   <Card.Title>{post.title}

                   </Card.Title>
                    <Card.Text className="item-content">
                    {post.description}
                    </Card.Text>
                  
                   
                    
                  </Card.Body>
                  <Card.Footer className="text-muted">
                  {post.date}
                  <Button variant="primary"  className="item-detail" onClick={()=>onHandleShowDetail(post.id)}>Chi tiết </Button>
                    <Button  onClick={()=>onHandleDeletePost(post.id)} ><FaRegTrashAlt/></Button>
                  <Button > <FaRegEdit/></Button></Card.Footer>
                  
                </Card>
                    

     
             ))}
       
        
         </Col>
                </Row>
             

            </Row>
            <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" style={{width: '75%'}}>
            {postDetail.title}
          
          </Modal.Title>
          <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label> Ngày tạo : {postDetail.date}</Form.Label><br/>
       
            
            </Form.Group>
        </Modal.Header>
        <Modal.Body>
        <Form >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" rows={3} className="content-item"  value={postDetail.content} />
            </Form.Group>
            
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShow(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={showAddCate}
        onHide={() => setShowCate(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add CatePost
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={onHandleAddCate}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title </Form.Label>
            
              
              <Form.Control type="title"name="name" placeholder="Title"  required  onChange={onHandleChangeAddCate}/> 
            </Form.Group>
            <Button type="submit">Save </Button>
          </Form>
      
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>setShowCate(false)}>Close</Button>
        
      </Modal.Footer>
      </Modal>
            </Container>
        </>
        
    )
}

export default Layout
