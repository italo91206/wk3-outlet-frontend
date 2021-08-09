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
                <p>
                  Catálogo
                  <i class="fas fa-angle-left right"></i>
                </p>
              </router-link>

              <ul class="nav nav-treeview">
                <!-- opção de produtos -->
                <li class="nav-item">
                  <router-link to="/admin/produtos" class="nav-link">
                    <p>Produtos</p>
                  </router-link>
                </li>

                <!-- opção de categorias -->
                <li class="nav-item">
                  <router-link to="" class="nav-link">
                    <p>Categorias</p>
                  </router-link>
                </li>

                <!-- opção de acerto -->
                <li class="nav-item">
                  <router-link to="" class="nav-link">
                    <p>Acerto de estoque</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- opção de marketing -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-bullhorn"></i>
                <p>
                  Marketing
                  <i class="fas fa-angle-left right"></i>
                </p>
              </router-link>

              <ul class="nav nav-treeview">
                <!-- opção de cupons -->
                <li class="nav-item">
                  <router-link to="/admin/cupons" class="nav-link">
                    <p>Cupons</p>
                  </router-link>
                </li>

                <!-- opção de newsletter -->
                <li class="nav-item">
                  <router-link to="" class="nav-link">
                    <p>Newsletter</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- opção de relatórios -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-clipboard"></i>
                <p>
                  Relatórios
                  <i class="fas fa-angle-left right"></i>
                </p>
              </router-link>

              <ul class="nav nav-treeview">
                <!-- opção de relatório por produtos -->
                <li class="nav-item">
                  <router-link to="" class="nav-link">
                    <p>Produtos</p>
                  </router-link>
                </li>

                <!-- opção de relatório por usuários -->
                <li class="nav-item">
                  <router-link to="" class="nav-link">
                    <p>Usuários</p>
                  </router-link>
                </li>

                <!-- opção de relatório por vendas -->
                <li class="nav-item">
                  <router-link to="" class="nav-link">
                    <p>Vendas</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- opção de suporte -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-question-circle"></i>
                <p>Suporte</p>
              </router-link>
            </li>

            <!-- opção de configurações -->
            <li class="nav-item">
              <router-link to="" class="nav-link">
                <i class="nav-icon fas fa-cog"></i>
                <p>
                  Configurações
                  <i class="fas fa-angle-left right"></i>
                </p>
              </router-link>

              <ul class="nav nav-treeview">
                <!-- opção de atributos -->
                <li class="nav-item">
                  <router-link to="/admin/atributos" class="nav-link">
                    <p>Atributos</p>
                  </router-link>
                </li>

                <!-- opção de preferências -->
                <li class="nav-item">
                  <router-link to="" class="nav-link">
                    <p>Preferências</p>
                  </router-link>
                </li>

                <!-- opção de loja -->
                <li class="nav-item">
                  <router-link to="" class="nav-link">
                    <p>Loja</p>
                  </router-link>
                </li>

                <!-- opção de motivos -->
                <li class="nav-item">
                  <router-link to="/admin/motivos" class="nav-link">
                    <p>Motivos</p>
                  </router-link>
                </li>

                <!-- opção de usuários -->
                <li class="nav-item">
                  <router-link to="/admin/usuarios" class="nav-link">
                    <p>Perfis</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- opção de sair -->
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">
                <i class="nav-icon fas fa-power-off"></i>
                <p>Sair</p>
              </router-link>
            </li>
          </ul>
        </nav>
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