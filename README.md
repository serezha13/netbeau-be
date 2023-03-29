# Netbeau Node

This is a express js server. It contains 7 requests, 6 for Node task and 1 for Front task.

You can run it by: node index.js

1. Create user
http://localhost:5000/user, JSON body: { first_name: string, last_name: string, age: number}

2. Get all users
http://localhost:5000/users

3. Get user by id
http://localhost:5000/user/:id, you can get it from second request, field: _id

4. Get user by query
http://localhost:5000/user?first_name=Test, also can be ?first_name=Test&last_name=User&age=25

5. User update by id
http://localhost:5000/user/:id, JSON body: { first_name: string, last_name: string, age: number}, at least one field required

6. User delete by id
http://localhost:5000/user/:id

7. Search list for Front task.
http://localhost:5000/search

![image](https://user-images.githubusercontent.com/39884693/228643850-ae9272bd-143b-44c6-b342-d52de5063473.png)
