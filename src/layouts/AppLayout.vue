<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const name = this.$route.meta.layout || "None";
      const layout = name || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
  mounted() {
    let jqueryScript = document.createElement('script');
    jqueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js');

    let bootstrap = document.createElement('script');
    bootstrap.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/js/bootstrap.bundle.min.js')
    
    let adminlte = document.createElement('script');
    adminlte.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.0.0/js/adminlte.min.js');

    let dashboard3 = document.createElement('script');
    dashboard3.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.0.0/js/pages/dashboard3.min.js');

    document.head.appendChild(jqueryScript);
    document.head.appendChild(bootstrap);
    document.head.appendChild(adminlte);
    document.head.appendChild(dashboard3);
  }
};
</script>