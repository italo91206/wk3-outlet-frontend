<template>
  <main id="se-product-page">
    <section class="se-container" id="breadcrumb-section">
      <p>
        <span class="se-underline" href="/">Home</span>
        <span class="se-breadcrumb-product-name">{{ produto.name }}</span>
      </p>
    </section>

    <!-- product 2-column section -->
    <section class="se-container se-flex" id="product-info-section">
      <!--arrow thumbs -->
      <div class="se-gallery-product-next se-desktop">
        <span class="fa fa-chevron-down"></span>
      </div>
      <div class="se-gallery-product-prev se-desktop">
        <span class="fa fa-chevron-up"></span>
      </div>

      <!-- thumbs slider -->
      <div class="swiper-container gallery-thumbs se-thumbs-gallery" id="se-product-slider">
        <div class="swiper-wrapper se-gallery__wrapper">
          <!-- <pwa-loop params="7">
                <div pwa-each-image class="swiper-slide">
                    <img pwa-preview-src="product-example" pwa-src="image" >
                </div>
          </pwa-loop>-->
        </div>
      </div>

      <div class="swiper-container gallery-top se-gallery se-relative" id="se-product-image">
        <!-- <div  pwa--if="activeSKU.discount > 0" class="se-price-off">{{ activeSKU.discount }}% OFF</div> -->
        <div class="swiper-wrapper" id="se-gallery__slide-wrapper">
          <!-- <pwa-loop params="7">
                <div pwa-each-image class="swiper-slide">
                    <img pwa-preview-src="product-example" pwa-src="image" class="se-image-zoom" pwa-hook.mouseenter="zoomin" :data-zoom-image="image" pwa-alt="product.name">
                </div>
          </pwa-loop>-->
        </div>
        <!-- <div pwa-hook.mouseenter="zoomin" class="se-product-view-zoom" pwa-is-desktop> <img pwa-src="zoom-icon" alt="zoom"> </div> -->
        <div class="se-gallery-product-next se-mobile">
          <span class="fa fa-chevron-down"></span>
        </div>
        <div class="se-gallery-product-prev se-mobile">
          <span class="fa fa-chevron-up"></span>
        </div>
      </div>

      <div id="se-product-buy-info">
        <!-- <p id="se-product-buy-info-marca">{{ product.specifications.product_brands }}</p> -->
        <p id="se-product-buy-info-name">{{ produto.nome }}</p>
        <p id="se-product-buy-info-sku">SKU: {{produto.sku}}</p>
        <!-- <p id="se-product-buy-info-price-now" >por até<span>{{ product.installment.number }}x {{ product.installment.value | price }}</span></p> -->

        <div class="se-buy-infos-product se-flex">
          <!-- <p id="se-product-buy-info-parcelas">ou {{ (product.promotional_price > 0 ? product.promotional_price : product.price) | price}}</p> -->
          <!-- <p id="se-product-buy-info-lead-to-parcelas" pwa--if="product.installment.number > 1"><a pwa-hook.click="toggle-split" class="se-reset se-underline">Simular as parcelas</a></p> -->
          <!-- <div class="se-product-split" v-if="product.installment">
              <span class="se-product-split-close" pwa-hook.click="toggle-split">x</span>
              <h2>Parcelamento</h2>
              <ul v-if="product.installment.number > 1">
                 <li pwa-each-installment>
                    <span>
                    {{ installment.number }} x de {{ installment.value | price }}
                    </span>
                 </li>
              </ul>
          </div>-->

          <!-- <pwa-product-list name="upsell" pwa-filters="[`referencia.keyword:${product.specifications.referencia}`]" class="p4a-conf-bundle manual">
              <div pwa--if="component.list.length > 0" class="p4a-conf-bundle__option manual">
                 <p pwa-hook="clica-primeira-cor" class="p4a-conf-bundle__option-name">
                    Cor <span>*</span>
                 </p>
                 <div  class="p4a-conf-bundle__option-input p4a-conf-bundle__option-color">
                    <label pwa-each-product pwa-to-product-page data-manual="true" pwa--if="product.variation_bundle[0]" >
                       <input name="cor" type="radio">
                       <div
                          class="p4a-conf-bundle__option-color--value"
                          pwa-class="{ 'se-cor-selecionada': product.path.replace('/', '') == $route.path.replace('/', '') }"
                          pwa-style="{ backgroundColor: product.variation_bundle[0].values[0].swatch}"
                          >
                       </div>
                       <div class="p4a-conf-bundle__option-color--title"> {{ product.variation_bundle[0].values[0].title }} </div>
                    </label>
                 </div>
              </div>
          </pwa-product-list>-->

          <!-- <pwa-product-configurations-bundle firsts-selected always-list attribute="variation_bundle" pwa-hook="clica-primeiro-tamanho">
          </pwa-product-configurations-bundle>-->

          <div id="se-product-quantity-option" class="se-product-option">
            <h3>Quantidade:</h3>
            <input id="product-quantity" />
          </div>

          <button v-if="produto.estoque" class="se-button-blue" disabled>Fora de estoque</button>
          <button v-else class="se-button-blue">comprar</button>

          <!-- <div class="se-frete-consult se-flex">
              <div class="se-frete-consult-form">
                 <input pwa-freight-box class="se-button-frete" placeholder="Calcular o frete"></input>
                 <span class="fa fa-truck" aria-hidden="true"></span>
                 <button pwa-freight-submit pwa-not-loading class="se-button-consultar">Consultar</button>
                 <pwa-hidden>
                    <div pwa-is-loading class="my-loader">
                       <span class="se-button-consultar"><img pwa-src="loading"/></span>
                    </div>
                 </pwa-hidden>
                 <p pwa--if="199 - $$cart.subtotal  <= 0" class="se-product-page-frete-gratis"><span>Frete grátis</span> disponível para este produto.</p>
              </div>
              <div class="se-frete-result">
                 <p pwa-each-freight>
                    {{ freight.title }} {{ freight.price | price }}
                 </p>
              </div>
          </div>-->
        </div>
      </div>
    </section>

    <!-- aproveite e leve junto slider section -->
    <!-- <pwa-product-linkeds type="upsell" class="se-container" id="se-leve-junto-section">
      <h2 class="se-text-center se-blue">Aproveite e leve junto</h2>
      <div class="se-flex">
        <div class="swiper-slide se-card-slide se-m-auto">
          <a class="se-releases__card se-releases__card--left">
            <button class="se-add-to-favorite">
              <span class="fa fa-heart-o"></span>
            </button>
            <div class="se-price-off">{{ activeSKU.discount }}% OFF</div>
            
            <img pwa-src="product.image" class="se-w100" pwa-alt="product.name" />
            <article class="se-card-title">
              <p class="se-card-title">{{ product.specifications.product_brands }}</p>
              <p class="se-card-full-title">{{ product.name }}</p>
              <p class="se-card-price">
                <span class="se-card-price-before">{{ activeSKU.old_price | price }}</span>
                <span class="se-card-price-actual">{{ activeSKU.sale_price | price }}</span>
              </p>
              <p class="se-card-parcelas">Em até 12x de R$ 10,38</p>
            </article>
          </a>
        </div>

        <span class="fa fa-plus se-m-auto"></span>
        <div pwa-each-linked class="swiper-slide se-card-slide se-m-auto">
          <a class="se-releases__card se-releases__card--left">
            <button class="se-add-to-favorite">
              <span class="fa fa-heart-o"></span>
            </button>
            <div
              pwa--show="linked.skus[0].discount > 0"
              class="se-price-off"
            >{{ linked.skus[0].discount }}% OFF</div>
            <img pwa-src="linked.image" class="se-w100" pwa-alt="linked.name" />
            <article class="se-card-overlay">
              <button pwa-to-linked-page class="se-button-blue">confira</button>
            </article>
            <article class="se-card-title">
              <p class="se-card-title">{{ linked.specifications.product_brands }}</p>
              <p class="se-card-full-title">{{ linked.name }}</p>
              <p class="se-card-price">
                <span class="se-card-price-before">{{ linked.skus[0].old_price | price }}</span>
                <span class="se-card-price-actual">{{ linked.skus[0].sale_price | price }}</span>
              </p>
              <p class="se-card-parcelas">
                Em até {{ linked.skus[0].installment.number }}x de
                {{ linked.skus[0].installment.value | price }}
              </p>
            </article>
          </a>
        </div>

        <div pwa--if="component.list.length > 0" class="se-cmd-4" id="se-leve-junto-holder">
          <h4>Leve os 2 produtos</h4>
          <p
            class="se-price-now"
          >por {{ (activeSKU.sale_price + component.list[0].skus[0].sale_price) | price }}</p>
          <button class="se-button-blue">adicionar à sacola</button>
        </div>
      </div>
    </pwa-product-linkeds> -->

    <!-- section com os 3 cmd-4 de informação -->
    <section id="product-details-section">
      <div class="se-container se-flex">
        <section class="se-cmd-4 se-product-description">
          <div class="se-product-description-title">
            <h3>Características</h3>
            <span class="ismobile">+</span>
          </div>
          <p class="se-product-description-text">
              {{ produto.descricao }}
          </p>
        </section>
        
        <section class="se-cmd-4 se-product-description">
          <div class="se-product-description-title">
            <h3>Descrição</h3>
            <span class="ismobile">+</span>
          </div>
        </section>

        <!-- <section class="se-cmd-4 se-product-description">
          <div class="se-product-description-title">
            <h3>Sobre a marca</h3>
            <span class="ismobile">+</span>
          </div>
          <p class="se-product-description-text" pwa--html="product.specifications.sobre_a_marca"></p>
          <div class="se-flex">
            <a
              pwa-href="`/catalogsearch/result/_todos?pwaf_product_brands=${product.specifications.product_brands}`"
              class="se-link-tags se-reset"
            >{{ product.specifications.product_brands }}</a>
          </div>
        </section> -->
      </div>
    </section>

    <!-- você também vai gostar slider section -->
    <!-- <pwa-product-linkeds type="relateds" id="se-voce-vai-gostar">
      <div class="se-container">
        <h2 class="se-text-center se-blue">Você também vai gostar</h2>
        <div class="swiper-container" id="se-slide-produtos2" pwa-hook="se-slide-produtos2">
          <div class="swiper-wrapper">
            <div pwa-each-linked class="swiper-slide se-card-slide">
              <a class="se-releases__card se-releases__card--left">
                <button class="se-add-to-favorite">
                  <span class="fa fa-heart-o"></span>
                </button>
                <div
                  pwa--show="linked.skus[0].discount > 0"
                  class="se-price-off"
                >{{ linked.skus[0].discount }}% OFF</div>
                
                <img pwa-src="linked.image" class="se-w100" alt="Blusas" />
                <article class="se-card-overlay">
                  <button pwa-to-linked-page class="se-button-blue">confira</button>
                </article>
                <article class="se-card-title">
                  <p class="se-card-title">{{ linked.specifications.product_brands }}</p>
                  <p class="se-card-full-title">{{ linked.name }}</p>
                  <p class="se-card-price">
                    <span class="se-card-price-before">{{ linked.skus[0].old_price | price }}</span>
                    <span class="se-card-price-actual">{{ linked.skus[0].old_price | price }}</span>
                  </p>
                  <p class="se-card-parcelas">
                    Em até {{ linked.skus[0].installment.number }}x de
                    {{ linked.skus[0].installment.value | price }}
                  </p>
                </article>
              </a>
            </div>
            <div pwa-is-loading class="pwat-results__list">
              <pwa-skeleton w="33%" size="6">
                <pwa-skeleton-block h="200px" />
                <pwa-skeleton-block class="ske-name" w="40%" h="15px" />
                <pwa-skeleton-block h="40px" />
                <pwa-skeleton-block class="ske-price" w="50%" h="40px" />
                <pwa-skeleton-block class="ske-install" w="80%" h="10px" />
              </pwa-skeleton>
            </div>
          </div>
        </div>
      </div>
    </pwa-product-linkeds> -->

    <!-- os 3 itens cmd-4 do footer (pague em ate 12x, retire na loja e entrega expressa) -->
    <section id="se-category-footer">
      <section class="se-container se-flex">
        <div class="se-cmd-4">
          <span class="icon-cartao"></span>
          <p>Pague em até</p>
          <h2>12x no cartão</h2>
        </div>

        <div class="se-cmd-4">
          <span class="icon-sacola"></span>
          <p>Compre aqui e</p>
          <h2>retire na loja</h2>
        </div>

        <div class="se-cmd-4">
          <span class="icon-entrega-expresso"></span>
          <p>Entrega expressa</p>
          <h2>em até 2 dias úteis</h2>
          <p class="se-gray">Consulte as cidades</p>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import service from "@/services/produto/produto-service.js";

export default {
  name: "ProductPage",
  data() {
    return {
      produto: {}
    };
  },
  methods: {
    async recuperarProduto(url) {
      const response = await service.recuperarProduto(url);
      this.produto = response.data.data;

      if (!this.produto) this.$router.push("/404");
    }
  },
  mounted() {
    const url = this.$route.params.product_url;
    this.recuperarProduto(url);
  }
};
</script>

<style lang="css" scoped>
/* ================
    PAGE PRODUCT
=================*/
.p4a-conf-bundle__option:not(.manual) .p4a-conf-bundle__option-color .p4a-conf-bundle__option-color--value {
    display: none !important;
}
.p4a-conf-bundle { width: 100%; }
.p4a-conf-bundle__option:not(.manual):first-child {
    display: none !important;
}

.se-product-view-zoom {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 99;
    width: 45px;
    height: 45px;
    background: #fff;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
}
.se-product-view-zoom img {
    width: 20px;
    height: 20px;
}

.zoomContainer {
  z-index: 9;
}

.se-cor-selecionada {
    transition: 0.3s;
    position: relative;
}
.se-cor-selecionada:before {
    content: '';
    width: 31.5px;
    height: 31.5px;
    background: transparent;
    border: 2px solid #444;
    position: absolute;
    z-index: 1;
    top: -4.6px;
    left: -4.6px;
    border-radius: 4px;
}
.p4a-conf-bundle__option-color--value,
.p4a-conf-bundle__option-color--title {
    margin-left: 0px !important;
}
#se-product-slider {
    margin-left: 40px;
    margin-right: 40px;
    width: 120px;
}

#se-product-image.se-gallery {
    width: 588px;
    height: 588px;
    border: solid 1px #C9EEFF;
    border-radius: 5px;
    margin-left: 0px;
    margin-right: 24px;
    position: relative;
}

#se-product-buy-info-sku {
    margin-top: 3px;
    margin-bottom: 0px;
    font-size: 12px;
    letter-spacing: 1.33px;
    color: #8CA2A6;
}

#se-product-buy-info {
    width: 384px;
    margin-left: 0px;
    margin-right: 0px;
}

#se-product-buy-info-marca {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2.0px;
    font-family: axiforma-bold;
    color: #001C3E;
}

#se-product-buy-info-name {
    margin-top: 14px;
    margin-bottom: 0px;
    font-family: axiforma-bold;
    font-size: 28px;
    text-transform: uppercase;
    color: #001C3E;
    max-width: 344px;
}

#se-product-buy-info-price-before {
    margin-top: 20px;
    margin-bottom: 0px;
    font-size: 14px;
    color: #8CA2A6;
}

#se-product-buy-info-price-now {
    font-family: axiforma-bold;
    font-size: 20px;
    margin-top: 12px;
    margin-bottom: 0px;
    color: #2BBAFE;
    display: flex;
    align-items: flex-start;
}

#se-product-buy-info-price-now span {
    font-size: 33px;
    font-family: axiforma-bold;
    margin-left: 10px;
    line-height: 20px;
}

.se-buy-infos-product {
    padding-top: 8px;
}

p#se-product-buy-info-parcelas {
    margin-top: 0px;
    margin-bottom: 0px;
    font-family: axiforma-bold;
    font-size: 14px;
    color: #2B85C1;
    letter-spacing: 1.2857px;
}

p#se-product-buy-info-parcelas span {
    margin-top: 0px;
    margin-bottom: 0px;
    color: #2BBAFE;
    font-family: axiforma-bold;
    font-size: 14px;
}

p#se-product-buy-info-lead-to-parcelas {
    color: #2B85C1;
    font-size: 12px;
    margin: 0 auto;
    margin-right: 0;
}

a.se-reset, a.se-reset:active, 
a.se-reset:hover, a.se-reset:focus, 
a.se-reset:visited {
    text-decoration: none;
    color: unset;
}

div#se-product-quantity-option {
    display: flex;
    padding-top: 10px;
}

.se-product-option {
    border-top: solid 1px #D6F2FF;
}

.se-product-option h3 {
    font-family: axiforma-bold;
    font-size: 14px;
    color: #001C3E;
    letter-spacing: 1.28px;
    margin-top: 13px;
}

button.se-square-box.disabled:hover {
    transform: unset;
    background-color: #DAF3FF;
}

button.se-square-box.disabled {opacity: 0.3;}

#se-product-color-option div.se-flex div {
    margin: 0 14px;
    text-align: center;
}

#se-product-color-option div.se-flex div:first-child {
    margin-left: 0px;
}
.p4a-conf-bundle__option-color label {
    display: flex;
    align-items: center;
    justify-content: center;
}

#se-product-number-option div.se-flex div.se-flex {
    width: 205px;
}

#se-product-quantity-option input#product-quantity {
    width: 58px;
    height: 32px;
    border: none;
    background-color: #DAF3FF;
    border-radius: 5px;
    margin-top: 7px;
    margin-left: 10px;
    text-align: center;
    color: #2B85C1;
}

#se-product-buy-info button.se-button-blue {
    width: 100%;
    margin-top: 21px;
}

.se-leve-junto-holder .se-button-blue {
    font-family: 'axiforma-bold';
}

.se-frete-consult {
    margin-top: 35px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.se-frete-consult-form {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    position: relative;
}
.se-frete-result p {
    font-size: 12px;
}

.se-frete-consult .fa-truck {
    position: absolute;
    top: 7px;
    left: 10px;
    transform: rotateY(180deg);
    font-size: 20px;
    color: #2BBAFE;
}

input.se-button-frete {
    margin: 0 auto;
    border: solid 1px #D1DBE0;
    padding-left: 37px;
    flex: 0.8;
    height: 30px;
    color: #2B85C1;
    letter-spacing: 1.3333px;
    font-size: 12px;
    margin-left: 0px;
    border-radius: 5px;
    margin-right: 22px;
}

.se-button-frete::-webkit-input-placeholder {
    color: #2B85C1;
}

button.se-button-consultar {
    flex: 1;
    height: 34px;
    border: none;
    border-radius: 5px;
    font-family: axiforma-bold;
    color: #2B85C1;
    font-size: 14px;
    background-color: #A7FFEF;
    cursor: pointer;
}
.se-product-description {
    position: relative;
}
.se-product-description h3 {
    font-family: Axiforma-bold;
    color: #2B85C1;
    font-size: 20px;
}

.se-product-description p {
    font-size: 16px;
    color: #5A6672;
}
.se-product-description-text.is-active {
    height: 130px;
    overflow: hidden;
    position: relative
}
.se-product-description-text.is-active:before {
	content: '';
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	background-image: linear-gradient(transparent,rgb(253 253 253))
}
.seeMore {
    font-size:12px;
	background-color : #2bbafe;
	color: #fff;
	padding: 1px 5px;
	border-radius: 4px;
    margin-bottom: 40px;
    width: fit-content;
    display: block;
   cursor: pointer;
}
.seeMore:hover {
	opacity: 0.7
}
.se-product-description-text.brand-right + .se-flex {
    position: absolute; 
    right: 2%;
    margin-top: 1px;
}

@media (max-width: 1025px) {
    .se-product-description:not(.se-description--active) .seeMore {
        display: none;
    }
}
a.se-link-tags {
    background-color: #2B85C1;
    border-radius: 5px;
    color: #fff !important;
    font-size: 12px;
    margin: 0 5px;
    padding: 0px 5px;
}

a.se-link-tags:hover {
    background-color: #58a8de;
    transition: all .1s ease;
}

section.se-cmd-4.se-product-description {
    margin: 0 auto;
}

div#se-product-slider img {
    border: solid 1px #C9EEFF;
    border-radius: 5px;
}

#se-product-number-option a {
    font-size: 12px;
    text-decoration: underline;
    color: #2B85C1;
    margin: 0 auto;
    margin-right: 0;
    margin-top: 13px;
}

.se-blue{
    color: #2B85C1;
}

.se-m-auto{
    margin: 0 auto;
}

.fa.fa-plus.se-m-auto {
    margin: auto;
    color: #2B85C1;
    font-size: 23px;
}

#se-leve-junto-section .swiper-slide:first-child {
    margin-left: 0px;
}

#se-leve-junto-holder h3 {
    color: #2BBAFE;
    font-size: 28px;
    font-family: Axiforma-Bold;
    margin-bottom: 0px;
    margin-top: 0px;
}

#se-leve-junto-holder h4 {
    font-family: Axiforma-Bold;
    font-size: 20px;
    margin-top: 0px;
    margin-bottom: 0px;
    color: #2B85C1;
}

p.se-price-before {
    font-size: 14px;
    font-family: axiforma-bold;
    color: #8CA2A6;
    margin-top: 37px;
    margin-bottom: 0px;
}

p.se-price-now {
    font-family: axiforma-bold;
    font-size: 33px;
    color: #2BBAFE;
    margin-top: 13px;
    margin-bottom: 0px;
}

.se-product-split {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: fixed;
    width: 300px;
    height: 475px;
    background: #fff;
    z-index: 999;
    box-shadow: 0 0 15px 9999px rgb(0,0,0, 0.4);
    left: calc((100% - 300px) / 2);
    top: calc((100% - 475px) / 2);
    border-radius: 5px;
    flex-flow: column;
    visibility: hidden;
    opacity: 0;
    transition: all .3s;
}
.se-product-split--active {
    visibility: visible !important;
    opacity: 1 !important;
    transition: all .3s;
}
.se-product-split h2 {
    margin: 0;
    padding: 10px 20px;
    color: #2bbafe;
}
.se-product-split ul {
    width: calc(100% - 20px);
    padding: 10px;
}
.se-product-split ul li {
    list-style: none;
    width: calc(100% - 20px);
    padding: 5px 10px;
}
.se-product-split ul li:not(:first-child) {
    border-top: 1px solid #e2e2e2;
}
.se-product-split-close {
    position: absolute;
    right: -35px;
    background: #fff;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

#se-leve-junto-holder button {
    width: 100%;
}

#se-leve-junto-holder {
    max-width: 305px;
    margin: auto auto;
    margin-right: 90px;
    margin-left: 115px;
    text-align: center;
}

#se-leve-junto-holder .se-button-blue {
    margin-top: 40px;
}

#se-leve-junto-section .swiper-slide:last-child {
    margin-right: 0px !IMPORTANT;
}

#se-leve-junto-section h2 {
    font-family: Axiforma-bold;
    font-size: 33px;
    margin-bottom: 39px;
}

#product-details-section {
    padding-top: 43px;
    margin-top: 60px;
    border-top: solid 1px #EEEEEE;
}

#se-voce-vai-gostar h2 {
    font-size: 33px;
    font-family: axiforma-bold;
    margin-top: 0px;
}

#se-voce-vai-gostar {
    margin-top: 50px;
    padding-top: 50px;
    border-top: solid 1px #EEEEEE;
    margin-bottom: 110px;
}

#voce-tambem-viu-section h2 {
    font-size: 33px;
    font-family: axiforma-bold;
    margin-top: 0px;
    margin-bottom: 34px;
}

section#voce-tambem-viu-section {
    margin-top: 110px;
    margin-bottom: 110px;
}

#breadcrumb-section p {
    color: #5A6672;
    font-size: 14px;
    text-transform: lowercase;
}
#breadcrumb-section p span { cursor: pointer; }
#breadcrumb-section p span:not(:last-child):after {
    content: '/';
    margin-left: 5px;
    margin-right: 5px;
}

span.se-last {
    color: #2BBAFE;
    font-family: Axiforma-bold;
    font-size: 14px;
}


.swiper-wrapper.se-gallery__wrapper {
    box-sizing: border-box;
    padding: 0px 0;
    width: 120px;
    height: 487px;
    margin: 0;
    margin-right: 35px;
    overflow: unset;
    /* margin-top: 50px; */
}

.se-thumbs-gallery .swiper-slide {
    width: 120px !important;
    background: #fff;
    height: 106px;
    opacity: 0.4;
    margin-bottom: 20px;
    cursor: pointer;
}

.se-gallery__wrapper .swiper-slide-active img {
    /*border: solid 1px #7fd7ff !important;*/
}

.se-thumbs-gallery .swiper-slide.swiper-slide-active {
    opacity: 1;
}

.se-gallery__wrapper {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-content: flex-start;
    max-height: 615px;
    overflow-y: auto;
    overflow-x: hidden;
}

.se-gallery__wrapper .swiper-slide img {
    height: 106px;
}

#se-gallery__slide-wrapper .swiper-slide img {
    width: 100%;
    cursor: zoom-in;
}

#breadcrumb-section p span:last-child {
    color: #2BBAFE;
    font-family: 'axiforma-bold';
    font-size: 14px;
}

.se-thumbs-product-prev {
    position: absolute;
    top: 13PX;
    left: 50px;
    COLOR: #2BBAFE;
}

.se-thumbs-product-next {
    position: absolute;
    bottom: 135px;
    left: 50px;
    color: #2BBAFE;
}

.se-thumbs-product-next:hover, .se-thumbs-product-prev:hover {
    cursor: pointer;
}

.gallery-top {
    height: 80%;
    width: 100%;
}

.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
}

.gallery-thumbs .swiper-slide {
    width: 25%;
    height: unset;
    opacity: 1;
}

.gallery-thumbs .swiper-slide-thumb-active {
    opacity: 1;
}

#se-product-page #breadcrumb-section {
    padding-left: 39px;
    text-transform: uppercase;
}

#se-product-buy-info-lead-to-parcelas a {
    font-size: 12px;
    font-family: axiforma-regular;
    text-decoration: underline;
    cursor: pointer;
}

#se-slide-produtos3 {
    max-width: 1200px;
    width: 90%;
}

.p4a-conf-bundle__option {
    border-top: 1px solid #D6F2FF;
}

.p4a-conf-bundle__option {
    border-top: 1px solid #D6F2FF;
}

.p4a-conf-bundle__option-color--list label[data-checked="true"] {
    border: solid 2px #2B85C1 !important;
    outline: none;
    background: #2BBAFE;
    height: 25px;
    width: 25px;
}

.p4a-conf-bundle__option-color--list label {
    height: 29px;
    width: 29px;
}

.p4a-conf-bundle__option-color--list label div {
    margin-top: 14px !important;
    margin-left: 7px !important;
    font-size: 14px;
}

.p4a-conf-bundle__option-color--list label div {
    margin: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
.p4a-conf-bundle__option-color--title {
    margin-top: 11px;
}
.p4a-conf-bundle__option-color--list label[data-checked="true"] div {
    color: #fff;
    margin-left: 4px !important;
}

.p4a-conf-bundle__option-color--list label {
    margin: 0 15px 10px 0 !important;
}

.p4a-conf-bundle__option-color--list {
    width: 100%;
    flex-wrap: wrap !important;
}

/* .p4a-conf-bundle__option-color--list label:nth-child(5n) {
    margin-right: 0px !important;
} */

input#product-quantity[type=number]::-webkit-inner-spin-button {
    opacity: 1;
}

.se-product-page-frete-gratis {
    margin-top: 21px;
    font-size: 12px;
    letter-spacing: .33px;
    color: #5A6672;
}

.se-product-page-frete-gratis span {
    color: #2BBAFE;
    font-size: 14px;
    font-family: 'axiforma-bold';
    letter-spacing: .28px;
    margin-right: 3px;
}

#product-info-section{
    position: relative;
}

#se-product-image{
    position: unset;
}

#se-product-slider {
    margin-top: 50px;
}

div#se-product-image {
    position: unset;
}

.se-gallery-product-next {
    position: absolute;
    top: 545px;
    left: 89px;
    color: #2BBAFE;
}

section#product-info-section {
    position: relative;
}

#se-product-slider {
    margin-top: 50px;
}

.se-gallery-product-prev {
    position: absolute;
    top: 13px;
    left: 89px;
    color: #2BBAFE;
}

.se-gallery-product-prev:hover {
    cursor: pointer;
}

.se-gallery-product-next:hover {
    cursor: pointer;
}

.se-buy-infos-product p {
    display: block;
    clear: both;
    width: 100%;
    margin: 7px 5px 0;
}

#se-selo-page-product__black-friday {
    position: absolute;
    top: 14px;
    right: 8px;
    width: 114px;
    z-index: 5;
}

.zoomContainer {
    /*display: none;*/
}

/* ====================
    MOBILE
=====================*/
@media (max-width: 767px) {
    section#se-category-footer .se-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        max-height: unset;
        height: auto;
    }
    section#se-category-footer {
        height: auto !important;
        margin-top: 30px;
    }
    section#se-category-footer .se-container .se-cmd-4:not(:last-child) {
        margin-bottom: 20px;
    }
    section#se-category-footer .se-container .se-cmd-4 {
        margin: 0;
    }
}
@media (max-width: 1024px) {
    .se-product-description h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .se-product-description-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .se-product-description-title span {
        background: #2B85C1;
        color: #fff;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        font-size: 16px;
        transition: all .3s;
    }

    .se-product-description p {
        display: none;
    }

    .se-description--active .se-product-description-title span {
        transform: rotate(45deg);
        transition: all .3s;
    }
    .se-description--active p {
        display: block !important;
    }

    .se-frete-consult-form {
        width: 100%;
        flex-flow: row wrap;
    }

    #se-product-buy-info {
        text-align: left !important;
        width: 100%;
    }
    
    #se-leve-junto-holder {
        max-width: 100%;
    }

    .swiper-slide.se-card-slide {
        width: 100%;
    }

    p.se-card-full-title {
        width: auto !important;
    }

    #se-selo-page-product__black-friday {
        width: 90px;
    }
}
</style>