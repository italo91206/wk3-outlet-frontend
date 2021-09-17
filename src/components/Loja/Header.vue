<template>
  <header id="se-header">
    <div id="se-cart__darken" class="se-cart__darken" style></div>

    <section id="se-top-header">
      <div class="se-container se-flex">
        <div class="se-item">
          <div class="se-fa-circle">
            <img
              src="/dist/img/default/icon-pagamento-parcelado.svg"
              alt="Pague em até 12x sem juros"
            />
          </div>
          <div class="se-text">Pague em até 12x sem juros</div>
        </div>

        <div class="se-item modal-btn">
          <div class="se-fa-circle">
            <img src="/dist/img/default/icon-retirada-loja.svg" alt="Compre aqui e retire na loja" />
          </div>
          <div class="se-text">Compre aqui e retire na loja</div>
        </div>

        <div class="modal-topo">
          <div class="modal-inner">
            <span class="close-modal">x</span>
            <h6>Compre aqui e retire na loja</h6>
            <p>Para facilitar as suas compras e agilizar o processo de seus produtos chegarem até você, temos a opção de retire aqui, você compra pelo site e assim que receber o e-mail de confirmação de pagamento seu produto é separado na loja e disponível para retirarada !!!</p>
            <p>Sem custo adicional</p>
            <p>Basta apresentar seu pedido e documento com foto.</p>
          </div>
        </div>

        <div class="se-item modal-btn">
          <div class="se-fa-circle">
            <img
              src="/dist/img/default/icon-entrega-expressa.svg"
              alt="Entrega expressa em até 1 dia útil"
            />
          </div>
          <div class="se-text">Entrega expressa em até 3 horas</div>
        </div>

        <div class="modal-topo">
          <div class="modal-inner">
            <span class="close-modal">x</span>
            <h6>Entrega expressa em até 3 horas</h6>
            <p>
              A entrega expressa é uma modalidade de envio exclusiva para as cidades em que estamos presentes
              com
              <a href="/quem-somos">lojas físicas.</a>
            </p>
            <p>
              Nessas localidades, caso o pagamento da sua compra seja confirmado antes das
              12h, os itens do seu pedido chegam até você no mesmo dia.
            </p>
            <p>Além disso, se a confirmação do seu pagamento acontecer após o meio-dia, você receberá seu pedido no próximo dia útil.</p>
            <p>
              Veja a
              <a href="/quem-somos">lista de lojas</a> que oferecem a entrega expressa e, se preferir, escolha essa modalidade no fechamento do seu pedido.
            </p>
          </div>
        </div>

        <div class="se-item">
          <div class="se-fa-circle">
            <img src="/dist/img/default/icon-whatsapp.svg" alt="Atendimento" />
          </div>
          <div class="se-text se-header-atendimento">
            <a
              href="https://api.whatsapp.com/send?phone=5544999290897&text=Converse%20com%20Serall%C3%AA%20Cal%C3%A7ados"
              target="_blank"
            >Atendimento</a>
          </div>
        </div>
      </div>
    </section>

    <section id="se-header">
      <div class="se-flex se-container">
        <span class="fa fa-bars se-mobile"></span>

        <a href="/">
          <img src="/dist/img/default/logo.png" alt id="se-logo" />
        </a>

        <span id="se-busca-mobile" class="fa fa-search se-mobile"></span>

        <div id="se-cart-icon" class="se-mobile">
          <a id="se-cart-open-button">
            <div class="circle">
              <i class="fa fa-shopping-bag"></i>
            </div>
          </a>
        </div>

        <section id="se-busca-home">
          <input placeholder="O que você precisa?" />
          <button>
            <i class="fa fa-search"></i>
          </button>
        </section>

        <div id="user-nav" class="se-flex">
          <div class="image">
            <img src="/dist/img/default/guest-profile-pic.png" alt id="se-guest-profile-pic" />
          </div>

          <div class="text">
            <h2>Olá!</h2>
            <a>Acesse sua conta</a>
          </div>
        </div>

        <div id="se-cart-icon">
          <a id="se-cart-open-button">
            <div class="circle">
              <i class="fa fa-shopping-bag"></i>
            </div>

            <div class="overlay">
              <span>2</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <nav id="se-nav">
      <div class="se-container">
        <ul class="menu">
          <li class="se-menu-item">
            <a>Liquidação</a>
            <span class="se-menu-open-mobile"></span>
          </li>

          <li class="se-menu-item">
            <a>Masculino</a>
            <span class="se-menu-open-mobile"></span>
          </li>

          <li class="se-menu-item">
            <a>Feminino</a>
            <span class="se-menu-open-mobile"></span>
          </li>

          <li class="se-menu-item">
            <a>Menino</a>
            <span class="se-menu-open-mobile"></span>
          </li>

          <li class="se-menu-item">
            <a>Menina</a>
            <span class="se-menu-open-mobile"></span>
          </li>

          <li class="se-menu-item">
            <a>Esporte</a>
            <span class="se-menu-open-mobile"></span>
          </li>

          <li class="se-menu-item se-mobile-nav-separator"></li>

          <li class="se-menu-item se-mobile-account">
            <a>Minha Conta</a>
          </li>
        </ul>
      </div>
    </nav>

    <div id="se-header-background"></div>
  </header>
</template>

<script>
export default {
  name: "LojaHeader"
};
</script>

<style lang="css">
#user-nav img:hover {
  cursor: pointer;
}

#se-cart-icon .overlay span {
  font-size: 13px;
}

#se-top-header {
  background-color: #ecf7fe;
  color: #2b85c1;
  height: 50px;
  letter-spacing: 1.33px;
}
#se-top-header .se-header-atendimento a {
  text-decoration: underline;
}

.se-flex {
  display: flex;
  flex-wrap: wrap;
}

.se-item {
  display: flex;
  margin: 0 auto;
  padding-top: 5px;
}

.se-fa-circle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  width: 38px;
  border-radius: 100%;
  background-color: #fff;
}

.se-item .se-fa-circle i.fa {
  padding-left: 12px;
  padding-top: 10px;
}

.se-text {
  padding-top: 13px;
  padding-left: 13px;
  font-family: "axiforma-regular";
  font-size: 12px;
}

#se-header img#se-logo {
  width: 202px;
  height: 77px;
  margin-top: 25px;
  margin-left: 64px;
}

#se-busca-home {
  width: 485px;
  height: 46px;
  border: 1px solid #e0e0e0;
  padding: 2px;
  border-radius: 5px;
  margin-top: 40px;
  margin-left: 84px;
  position: relative;
  transition: 100ms ease;
  z-index: 998;
}

#se-busca-home input {
  border: none;
  width: 380px;
  height: 46px;
  padding-left: 15px;
  font-size: 12px;
  color: #8ca2a6;
}

#se-busca-home:focus-within {
  border-color: #b6b6b6;
}

#se-busca-home button {
  background-color: #2bbafe;
  border: none;
  width: 94px;
  height: 46px;
  border-radius: 5px;
  color: white;
  position: absolute;
  right: 2px;
  top: 2px;
}

#se-busca-home input:focus {
  outline: none;
  z-index: 999999;
}
.se-suggest-fullbox-shadow {
  box-shadow: 0 0 15px 4999px rgba(0, 0, 0, 0.4);
}
.se-search-nav-found-products {
  background: #fff;
  width: 100%;
  position: absolute;
  z-index: 999;
  top: 50px;
  left: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  max-height: 50vh;
  overflow-y: auto;
}
.se-search-nav-found-products h2 {
  color: #2b85c1;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 100;
}
.se-search-nav-found-products .se-search-nav-found-products-cards img {
  width: 100px;
  border-radius: 5px;
  border: 1px solid #359bcc40;
}
.se-search-nav-found-products-cards .se-search-nav-found-products-cards-info {
  margin-left: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
}
.se-suggest-discount {
  width: 67px;
  height: 16px;
  background-color: #fec417;
  color: #fff;
  font-family: Axiforma-bold;
  font-size: 10px;
  border-radius: 3px;
  padding-top: 7px;
  padding-left: 10px;
  letter-spacing: 2px;
  z-index: 9;
  margin-bottom: 10px;
}
.se-search-nav-found-products-cards
  .se-search-nav-found-products-cards-info
  h3 {
  font-size: 15px;
  font-weight: 100;
  margin: 0;
  margin-bottom: 15px;
}
.se-search-nav-found-products-cards .se-search-nav-found-products-cards-info p {
  margin: 0;
}
.se-search-nav-found-products-cards
  .se-search-nav-found-products-cards-info
  label {
  color: #2bbafe;
}
.se-search-nav-found-products-cards {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  background: #f2f2f2;
  border: 1px solid #ededed;
  margin: 15px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

img#se-guest-profile-pic {
  width: 40px;
  height: 40px;
}

#se-header #user-nav h2 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 10px;
  font-weight: 100;
  text-transform: uppercase;
  color: #2b85c1;
}

#se-setima-linha .se-cmd-6:first-child {
  margin-left: 0px;
}

#se-setima-linha .se-cmd-6:last-child {
  margin-right: 0px;
}

#user-nav a {
  color: #2bbafe;
  font-size: 8px;
  text-transform: uppercase;
}

#se-favoritos {
  height: 40px;
  width: 40px;
  background-color: #ffe6fa;
  color: #d0a6c7;
  border-radius: 100%;
  cursor: pointer;
  margin: 46px 24px 0 43px;
}

#se-favoritos i.fa {
  padding-left: 10px;
  font-size: 20px;
  padding-top: 10px;
  color: #d0a6c7;
}

#se-cart-icon {
  /* position: relative;
    margin-top: 46px;
    margin-left: 24px;
    cursor: pointer; */
  margin: 46px 56px 0 0;
  position: relative;
}

#se-cart-icon .overlay {
  position: absolute;
  height: 23px;
  width: 23px;
  background-color: #2bbafe;
  border-radius: 100%;
  color: white;
  top: 0;
  right: -15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

#se-cart-icon .circle {
  height: 40px;
  width: 40px;
  background-color: #ecf7fe;
  color: #8dc0e1;
  border-radius: 100%;
}

#se-cart-icon .circle i.fa {
  font-size: 20px;
  padding-top: 9px;
  padding-left: 10px;
}

section#se-header {
  height: 130px;
  background-color: #fff;
}

#user-nav {
  margin-top: 46px;
  margin-left: 46px;
  width: 178px;
}

#user-nav .text {
  letter-spacing: 2px;
  cursor: pointer;
  margin-left: 8px;
  margin-top: 4px;
}

#se-nav {
  height: 60px;
  background-color: #fff;
  border-top: solid 1px #ebebeb;
}

#se-nav ul.menu {
  list-style-type: none;
  margin-block-start: 0px;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0;
  display: flex;
  justify-content: space-around;
  position: relative;
  height: 100%;
}
#se-nav ul.menu li a:hover {
  font-size: 17px;
  transition: all 0.2s;
}

/* nav#se-nav ul.menu li {
    float: left;
    margin: 0 auto;
    font-size: 14px;
    transition: all .1s ease;
    color: #001C3E;
} */

.submenu ul.menu li {
  float: initial;
  color: #5a6672;
  list-style: none;
  /* margin-inline-start: -38px; */
  margin-bottom: 18px;
}

.submenu ul.menu li a {
  transition: all 0.4s ease;
}

.submenu {
  top: 60px;
  left: 0;
  position: absolute;
  opacity: 0;
  visibility: hidden;
  z-index: 10;
}

.se-category-list li {
  float: initial;
  color: #5a6672;
  list-style: none;
  /* margin-inline-start: -38px; */
  margin-bottom: 18px;
}

ul.se-category-list li {
  width: 49%;
}

@media (max-width: 1024px) {
  ul.se-category-list li {
    width: calc(50% - 20px) !important;
    padding: 5px !important;
  }
}

.se-category-list {
  padding-inline-start: 0px;
  display: flex;
  flex-flow: row wrap;
}

.submenu-content h3 {
  margin-block-start: 6px;
  margin-block-end: 17px;
}

.se-category-list li {
  line-height: 30px;
}

.se-more-category-links {
  padding-inline-start: 0px;
}

.se-category-list li:last-child {
  margin-bottom: 30px !important;
}

.se-menu-item {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 21px;
  font-size: 14px;
  transition: all 0.1s ease;
  color: #001c3e;
  cursor: pointer;
}

.se-more-category-links li {
  float: initial;
  /* margin-inline-start: -33px; */
  margin-bottom: 18px;
  list-style: none;
}

.se-more-category-links li:hover {
  border: none;
  color: #0b96d8;
  font-weight: 800;
}

.se-brand-line {
  position: relative;
}

.se-slide-brand-masculino-next,
.se-slide-brand-feminino-next,
.se-slide-brand-menino-next,
.se-slide-brand-menina-next,
.se-slide-brand-esporte-next {
  position: absolute;
  right: 0px;
  top: 25%;
}

.se-slide-brand-masculino-prev,
.se-slide-brand-feminino-prev,
.se-slide-brand-menino-prev,
.se-slide-brand-menina-prev,
.se-slide-brand-esporte-prev {
  position: absolute;
  top: 25%;
  left: 0px;
}

.se-slide-brand-masculino-prev,
.se-slide-brand-masculino-next,
.se-slide-brand-feminino-prev,
.se-slide-brand-feminino-next,
.se-slide-brand-menino-prev,
.se-slide-brand-menino-next,
.se-slide-brand-menina-prev,
.se-slide-brand-menina-next,
.se-slide-brand-esporte-prev,
.se-slide-brand-esporte-next {
  background-color: #001c3e;
  border-radius: 120px;
  height: 48px;
  width: 48px;
  display: flex;
  z-index: 1;
}

.se-slide-brand-masculino-next .fa,
.se-slide-brand-masculino-prev .fa,
.se-slide-brand-feminino-next .fa,
.se-slide-brand-feminino-prev .fa,
.se-slide-brand-menino-next .fa,
.se-slide-brand-menino-prev .fa,
.se-slide-brand-menina-next .fa,
.se-slide-brand-menina-prev .fa,
.se-slide-brand-esporte-next .fa,
.se-slide-brand-esporte-prev .fa {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}

.se-brand-slide img {
  width: 80px;
  max-width: 80px;
}

#se-slide-brand-masculino-home,
#se-slide-brand-feminino-home,
#se-slide-brand-menino-home,
#se-slide-brand-menina-home,
#se-slide-brand-esporte-home {
  width: 460px;
  height: 90px;
}

.swiper-slider-wrapper,
#se-slide-brand-masculino-home .swiper-slider-wrapper,
#se-slide-brand-feminino-home .swiper-slider-wrapper,
#se-slide-brand-menino-home .swiper-slider-wrapper,
#se-slide-brand-menina-home .swiper-slider-wrapper,
#se-slide-brand-esporte-home .swiper-slider-wrapper {
  padding: 0 50px;
  position: relative;
}

#se-slide-brand-masculino-home .swiper-wrapper,
#se-slide-brand-feminino-home .swiper-wrapper,
#se-slide-brand-menino-home .swiper-wrapper,
#se-slide-brand-menina-home .swiper-wrapper,
#se-slide-brand-esporte-home .swiper-wrapper {
}

#se-slide-brand-masculino-home .swiper-wrapper .swiper-slide,
#se-slide-brand-feminino-home .swiper-wrapper .swiper-slide,
#se-slide-brand-menino-home .swiper-wrapper .swiper-slide,
#se-slide-brand-menina-home .swiper-wrapper .swiper-slide,
#se-slide-brand-esporte-home .swiper-wrapper .swiper-slide {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: fit-content !important;
}

#se-nav .se-container {
  height: 60px;
}

#se-cart__darken {
  width: 100%;
  background: #000000a6;
  height: 100%;
  z-index: 999;
  position: fixed;
  display: none;
  animation: none;
}

/* ===============
PARTE DOS SUBMENUS
ESPORTE, FEMININO, MASCULINO, MENINA, MENINO
=============== */

/* #se-slide-brand-MENINO,
#se-slide-brand-MENINA,
#se-slide-brand-MASCULINO,
#se-slide-brand-FEMININO,
#se-slide-brand-ESPORTE {
    position: relative;
} */

/* .se-slide-brand-MENINO-next,
.se-slide-brand-MENINA-next,
.se-slide-brand-MASCULINO-next,
.se-slide-brand-FEMININO-next,
.se-slide-brand-ESPORTE-next{
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 2;
} */

/* .se-slide-brand-MENINO-prev,
.se-slide-brand-MENINA-prev,
.se-slide-brand-MASCULINO-prev,
.se-slide-brand-FEMININO-prev,
.se-slide-brand-ESPORTE-prev{
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
} */

/* .se-slide-brand-MENINO-next .fa-chevron-right,
.se-slide-brand-MENINA-next .fa-chevron-right,
.se-slide-brand-MASCULINO-next .fa-chevron-right,
.se-slide-brand-FEMININO-next .fa-chevron-right,
.se-slide-brand-ESPORTE-next .fa-chevron-right {
    background-color: #001C3E;
    border-radius: 120px;
    height: 48px;
    width: 48px;
    z-index: 2;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto auto;
} */

/* .se-slide-brand-MENINO-prev .fa-chevron-left,
.se-slide-brand-MENINA-prev .fa-chevron-left,
.se-slide-brand-MASCULINO-prev .fa-chevron-left,
.se-slide-brand-FEMININO-prev .fa-chevron-left,
.se-slide-brand-ESPORTE-prev .fa-chevron-left {
    background-color: #001C3E;
    border-radius: 120px;
    height: 48px;
    width: 48px;
    z-index: 2;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto auto;
} */

/* #se-slide-brand-MENINO .swiper-wrapper,
#se-slide-brand-MENINA .swiper-wrapper,
#se-slide-brand-MASCULINO .swiper-wrapper,
#se-slide-brand-FEMININO .swiper-wrapper,
#se-slide-brand-ESPORTE .swiper-wrapper {
    width: 494px;
    height: 90px;
    z-index: 1;
} */

/* #se-slide-brand-MENINO .swiper-slide,
#se-slide-brand-MENINA .swiper-slide,
#se-slide-brand-MASCULINO .swiper-slide,
#se-slide-brand-FEMININO .swiper-slide,
#se-slide-brand-ESPORTE .swiper-slide {
    margin-top: 12px;
} */

/* #se-slide-brand-MENINO,
#se-slide-brand-MENINA,
#se-slide-brand-MASCULINO,
#se-slide-brand-FEMININO,
#se-slide-brand-ESPORTE {
    margin-top: 47px;
} */

/* .se-slide-brand-MENINO-next:hover,
.se-slide-brand-MENINA-next:hover,
.se-slide-brand-MASCULINO-next:hover,
.se-slide-brand-FEMININO-next:hover,
.se-slide-brand-ESPORTE-next:hover {
    cursor: pointer;
} */

/* .se-slide-brand-MENINO-prev:hover,
.se-slide-brand-MENINA-prev:hover,
.se-slide-brand-MASCULINO-prev:hover,
.se-slide-brand-FEMININO-prev:hover,
.se-slide-brand-ESPORTE-prev:hover {
    cursor: pointer;
} */

#se-after-nav .se-frete-fundo {
  height: 30px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

@media (max-width: 1024px) {
  #se-after-nav .se-frete-fundo {
    height: 50px;
  }
}

#se-after-nav .se-frete-preenchimento {
  height: 30px;
}

#se-after-nav .se-frete-text {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#se-after-nav .se-quanto-falta span {
  margin-left: 0px;
}

#se-after-nav .se-quanto-falta {
  font-size: 14px;
  font-family: "axiforma-bold";
  letter-spacing: 0.28px;
}

#se-after-nav .se-quanto-falta span:first-child {
  color: #a7ffef;
}

#se-after-nav .se-quanto-falta span:last-child {
  color: #fec417;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  #se-after-nav .se-quanto-falta {
    font-size: 11px !important;
    text-align: center;
  }
  #se-after-nav .se-frete-text {
    /* left: 10%; */
  }
  #se-cart-icon.se-mobile {
    margin: 0 !important;
  }
}

#se-cart-icon:hover {
  cursor: pointer;
}

.se-mobile-nav-separator {
  border-bottom: 1px solid #e6e6e6;
  margin-top: 10px;
  margin-bottom: 8px;
  display: none;
}

.se-mobile-account {
  display: none;
}

@media (max-width: 768px) {
  .se-mobile-nav-separator,
  .se-mobile.account {
    display: block;
  }

  .se-has-sub-mobile {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 10px;
    top: 10px;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    transform: rotate(45deg);
    border-radius: 3px;
    display: flex !important;
  }

  .se-has-sub-mobile:active + .se-category-sub {
    display: block !important;
  }

  .se-has-sub-desktop {
    display: none !important;
  }

  .se-category-sub li {
    margin: 6px 0px 6px -24px;
  }

  .se-has-sub:hover .se-has-sub-mobile {
    transform: rotate(225deg);
    margin-top: 6px;
  }
}

.se-category-sub {
  display: none;
  position: absolute;
  background-color: #fff;
  z-index: 10;
  width: 350px;
}

.se-category-sub li {
  line-height: 5px;
  padding-top: 14px;
  width: 100% !important;
}

.se-has-sub:hover .se-category-sub {
  display: block;
}

.se-has-sub-mobile {
  display: none;
}

.se-has-sub-desktop {
  width: 10px;
  height: 10px;
  position: absolute;
  margin-top: -25px;
  margin-left: 175px;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: rotate(45deg);
  border-radius: 3px;
  display: flex;
}

.se-has-sub:hover .se-has-sub-desktop {
  transform: rotate(225deg);
  margin-top: -20px;
}

.modal-topo {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #00000090;
  height: 100%;
  width: calc(100% - 40px);
  z-index: 1000;
  padding: 20px;
}
.modal-inner {
  width: calc(100% - 30px);
  max-width: 600px;
  background-color: #ffffffff;
  margin: auto;
  padding: 15px;
  border-radius: 8px;
  position: relative;
}
.modal-topo.--open {
  display: block;
}
.modal-topo .close-modal {
  position: absolute;
  right: 20px;
  cursor: pointer;
}

.modal-topo h6 {
  font-size: 16px;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 25px;
}
.modal-topo p {
  font-size: 12px;
}
.modal-topo a {
  text-decoration: underline;
}
</style>