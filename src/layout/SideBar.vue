<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4" style="position: fixed; overflow-y: scroll; top: 0; bottom: 0;overflow-x: hidden; overflow-y: hidden">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a class="d-block">Alexander Pierce</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <a class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Starter Pages
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link  :to="{ name: 'Dashboard' }" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>
                    Home
                  </p>
                </router-link>
              </li>
<!--              <li class="nav-item">-->
<!--                <router-link :to="{ name: 'Dashboard' }" class="nav-link">-->
<!--                  <i class="far fa-circle nav-icon"></i>-->
<!--                  <p>-->
<!--                    In active-->
<!--                  </p>-->
<!--                </router-link>-->
<!--              </li>-->
            </ul>
          </li>
          <li class="nav-item">
            <router-link :to="{ name : 'Vehicle-categories' }" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Vehicle categories
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name : 'Vehicle-companies' }" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Vehicle companies
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name : 'Vehicle-types' }" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Vehicle types
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name : 'Riders list'}" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Riders
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>