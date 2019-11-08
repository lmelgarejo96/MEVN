<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 pt-5">
                <div class="card">
                    <div class="card-header">
                        <h4>Add a new User</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="addUser()">
                            <div class="form-group">
                                <input type="text" v-model="user.name" placeholder="Insert an User" class="form-control">
                            </div>
                            <div class="form-group">
                                <input type="text" v-model="user.correo" placeholder="Insert an email" class="form-control">
                            </div>
                            <div class="form-group">
                                <textarea  v-model="user.description" cols="30" rows="10" placeholder="Insert a description" class="form-control"></textarea>
                            </div>
                            <button class="btn btn-info btn-block">SAVE</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6 pt-5">
                <div class="row pr-0">
                    <div class="table-responsive-xl">
                        <table class="table table-hover table-borderead">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"></th>
                                    <th scope="col">Actions</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr scope="row" v-for="(user, index) in users " :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{user.name}}</td>
                                    <td>{{user.correo}}</td> 
                                    <td>{{user.description}}</td> 
                                    <td>
                                        <button class="btn btn-primary badge-pill badge-primary" @click="takeUser(user, 1)" data-toggle="modal" data-target="#userModal"><i class="fas fa-info-circle fa-2x"></i></button> 
                                    </td>
                                    <td>
                                        <button class="btn btn-info badge-pill badge-info" @click="takeUser(user, 2)" data-toggle="modal" data-target="#userModal"><i class="fas fa-edit fa-2x"></i></button>
                                    </td>
                                    <td>
                                        <button class="btn btn-danger badge-pill badge-danger" @click="deleteUser(user._id)"><i class="fas fa-trash-alt fa-2x"></i></button> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-3 pt-5">
                <div class="card">
                    <div class="card-header">
                        <h4>Add a new User</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="addUser()">
                            <div class="form-group">
                                <input type="text" v-model="user.name" placeholder="Insert an User" class="form-control">
                            </div>
                            <div class="form-group">
                                <input type="text" v-model="user.correo" placeholder="Insert an email" class="form-control">
                            </div>
                            <div class="form-group">
                                <textarea  v-model="user.description" cols="30" rows="10" placeholder="Insert a description" class="form-control"></textarea>
                            </div>
                            <button class="btn btn-info btn-block">SAVE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL -->
        <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userModalLabel">{{title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form >
                            <div class="form-group">
                                <input id="edit-name" type="text" v-model="editUser.name" placeholder="Insert an User" class="form-control">
                            </div>
                            <div class="form-group">
                                <input id="edit-correo" type="text" v-model="editUser.correo" placeholder="Insert an email" class="form-control">
                            </div>
                            <div class="form-group">
                                <textarea id="edit-description"  v-model="editUser.description" cols="30" rows="10" placeholder="Insert a description" class="form-control"></textarea>
                            </div>
                            <button id="btn-update" class="btn btn-info btn-block" @click="updateUser()" data-dismiss="modal">SAVE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
class User {
    constructor(id, name, correo, description){
        this.id = id;
        this.name = name;
        this.correo = correo;
        this.description = description;
    }
} 

export default {
    name: 'Form',
    data() {
        return {
            user: new User(),
            editUser: new User(),
            userToEdit: {},
            users: [],
            title: '',
            editable: true
        }
    },
    created() {
       this.getUsers()
    },
    methods: {
        // Modal
        takeUser(user, typebtn){
            // details user
            if(typebtn === 1){
                this.title = 'Details User';
                document.getElementById("btn-update").disabled = true;
                document.getElementById("edit-name").disabled = true;
                document.getElementById("edit-correo").disabled = true;
                document.getElementById("edit-description").disabled = true;
                this.editUser = new User(user._id, user.name, user.correo, user.description);
            }else{ //edit user
                document.getElementById("btn-update").disabled = false;
                document.getElementById("edit-name").disabled = false;
                document.getElementById("edit-correo").disabled = false;
                document.getElementById("edit-description").disabled = false;
                this.title = 'Edit User';
                this.editUser = new User(user._id, user.name, user.correo, user.description);
                this.userToEdit = this.editUser;
            }
            
        },
        //API REST
        addUser(){
            let user = this.user
            delete user.id
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getUsers();
            })
        },
        getUsers(){
            fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                this.users = data
                console.log(this.users)
            })
        },
        updateUser(){
            let user = this.userToEdit
            fetch('/api/users/'+user.id, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.getUsers();
            })
        },
        deleteUser(id){
            fetch('/api/users/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getUsers();
            })
        }
    },

}
</script>