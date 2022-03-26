<template>
    <div class="container">
        <div class="row justify-content-center align-items-center" style="height:100vh">
            <div class="col-4">
                <div class="card shadow-lg">
                    <div class="card-body">
                        <h4 class="card-title text-center">Вход</h4>
                        <form action="" autocomplete="off">
                            <div class="form-group">
                                <label class="form-label">Email address</label>
                                <input type="email" class="form-control" name="username">
                            </div>
                            <div class="form-group mt-2">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" name="password">
                            </div>
                            <button type="button" class="btn btn-primary btn-block mt-3">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>