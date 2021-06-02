<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <router-link to="/dashboard" id="brand-link" class="w100">
        <img
          src="logotipo-extenso-bw.png"
          alt="WK3 Logo"
          class="brand-image"
        />
      </router-link>

      <div class="sidebar">
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <!-- opção de perfil -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>Perfil</p>
              </router-link>
            </li>

            <!-- opção de vendas -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-dollar-sign"></i>
                <p>Vendas</p>
              </router-link>
            </li>

            <!-- opção de catálogo -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-box-open"></i>
                <p>Catálogo</p>
              </router-link>
            </li>

            <!-- opção de marketing -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-bullhorn"></i>
                <p>Marketing</p>
              </router-link>
            </li>

            <!-- opção de relatórios -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-clipboard"></i>
                <p>Relatórios</p>
              </router-link>
            </li>

            <!-- opção de suporte -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-question-circle"></i>
                <p>Suporte</p>
              </router-link>
            </li>

            <!-- opção de suporte -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-cog"></i>
                <p>Configurações</p>
              </router-link>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
    </aside>
</template>

<script>
export default {
    name: "SideMenu"
}
</script>

<style>
#brand-link{
  display: inline-block;
}
#brand-link img{
  width: 50%;
  margin: 15px auto;
  display: flex;
}
</style>