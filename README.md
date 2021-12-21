## Final Project

**TuwaiqAuth** : Application allows you to create account and send/receive money to/from any user in application using NFC or QRCode

## User Stories

- **Signup:** As a normal user I can sign up in the web app so that I start using my account in other websites 
- **Login:** As a user I can login to the web app so that I can make update for my account 
- **Login:** As an admin I can login to the web app so that I can mange users data and do updates and accept orders
- **Logout:** As a user/admin I can logout from the web app so no one else can use it


## Client / Frontend

### React  Routes (WEB App)

| Path | Component | Permissions | Behavior |
| --- | --- | --- | --- |
| `/landing` | Home page | public `<Route>` | First page when  the web start |
| `/register` | RegisterComponent | public `<Route>` | Signup form, link to login, navigate to homepage after signup |
| `/login` | LoginComponent |  public `<Route>` | Login form navigate to users dashboard page |
| `/dashboard` | dashboard |  `<PrivateRoute>` |  | if user is admin will give authorize full access 


  

### Pages

- Home page
  
- Login
  
- Register
  
- Dashboard
  
- Users
  
- Orders

- Settings
  

## Server / Backend

### Models

Users model

```
{
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
   date: {type: String},
   role: {  type:String,    default:"Normal User"},
  password: {type: String, required: true},
}
```

Company model

```
 {
     company: {type: String, required: true},
    email: {type: String, required: true},

 }
```

Orders model 

```
{
    company: {type: String , required:true},
    email: { type: String, required: true },
     url: { type: String, required: true },
     status: { type: String, required: true },
     phone: { type: String, required: true },
}
```

### Backend routes

| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| --- | --- | --- | --- | --- | --- |
| GET | `/auth/me` |     | 200 | 404 | Check if user is logged in and return profile page |
| POST | `/auth/signup` | {name, email, password} | 201 | 404 | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST | `/auth/login` | {username, password} | 200 | 401 | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST | `/auth/logout` | (empty) | 204 | 400 | Logs out the user |

### Links

- [Trello/Kanban](https://trello.com/invite/b/MCYlKave/effb3ea1df3a5a35a1cf72d6368d2174/tuwaiqauth)

- Git
  

[Client repository Link](https://github.com/aalsbr/TuwaiqAuth/tree/master/front)

[Server repository Link](https://github.com/aalsbr/TuwaiqAuth/tree/master/front)

- Slides

- Wireframe
