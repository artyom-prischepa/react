import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
    getPosts().then((data) => setPosts(data));
  }, []);

  // Функция для получения данных о пользователях с сервера
  const getUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

   // Функция для получения данных о постах с сервера
   const getPosts = async () => {
     try{
       const response=await axios.get('https://jsonplaceholder.typicode.com/posts')
       return response.data;
     }
     catch(error){
       console.error(error);
     }
   }

   // Добавление стилизации 
   const style = {
    backgroundColor: '#006400'
  }

   // Поиск постов пользователей и сохранение информации в новом массиве объектов
const usersWithPost = users.map(user=>({...user,
post: posts.find(post=>post.userId === user.id)}))

return (
<div style={{ padding: "20px" }}>
<h1>Пользователи:</h1>

<Row gutter={[16,16]}>
{users.map(user =>
        <Col span={8} key={user.id}>
          <Card style={style} title={user.name}>
            <p>Email: {user.email}</p>
            <p>Телефон: {user.phone}</p>
          </Card>
        </Col>)}
</Row>

<h1>Посты:</h1>

<Row gutter={[16,16]}>
{posts.map(post =>
        <Col span={8} key={post.id}>
          <Card style={style} title={post.title}>
            <p>{post.body}</p>
          </Card>
        </Col>)}
</Row>

<h1>Посты пользователей:</h1>

<Row gutter={[16,16]}>
{usersWithPost.map(user =>
  user.post &&
    <Col span={8} key={`${user.id}-${user.post.id}`}>
      <Card style={style} title={`${user.name} написал:`}>
        <>
          <h3>{user.post.title}</h3>
          <p>{user.post.body}</p>  
        </>
      </Card>
    </Col>)
}
</Row>

</div>
);
}

export default App;


