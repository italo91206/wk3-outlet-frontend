<template>
  <footer id="se-footer">
    <section id="newsletter" class="se-relative">
      <img src="/dist/img/default//dist/img/newsletter-image.png" alt id="img-newsletter" />
      <div id="se-footer-newsletter-container" class="se-container se-flex">
        <div id="se-newsletter-image-holder" class="se-relative">
          <span class="discount">Assine nossa News</span>
          <span class="discount-text">Para ficar por dentro das novidades</span>
        </div>

        <div id="se-newsletter-form">
          <section action>
            <input type="text" placeholder="Nome" />
            <input type="text" placeholder="E-mail" />
            <button type="submit" class="se-button-blue">Cadastrar</button>
          </section>
        </div>
      </div>
    </section>

    <section id="footer-links">
      <div class="se-container se-flex">
        <section id="institucional">
          <h3>Institucional</h3>
          <ul class="se-footer-list">
            <li>
              <a href="quem-somos">Quem somos</a>
            </li>
            <li>
              <a href="entrega-expressa">Entrega expressa</a>
            </li>
          </ul>
        </section>

        <section id="ajuda">
          <h3>Ajuda</h3>
          <ul class="se-footer-list">
            <li>
              <a href="politica-de-privacidade">Política de Privacidade</a>
            </li>
            <li>
              <a href="trocas-devolucoes">Trocas e devoluções</a>
            </li>
            <li>
              <a href="duvidas-frequentes">Dúvidas frequentes</a>
            </li>
          </ul>
        </section>

        <section id="redes-sociais">
          <h3>Redes sociais</h3>
          <ul class="se-footer-list">
            <li>
              <a href="https://www.facebook.com/serallecalcadosoficial/" target="_blank">
                <div class="se-circle">
                  <i class="fa fa-facebook-f"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/seralle_oficial/?hl=pt-br" target="_blank">
                <div class="se-circle">
                  <i class="fa fa-instagram"></i>
                </div>
              </a>
            </li>
            <li style="opacity: 0;">
              <a href="https://www.facebook.com/serallecalcadosoficial/" target="_blank">
                <div class="se-circle">
                  <i class="fa fa-facebook-f"></i>
                </div>
              </a>
            </li>
            <li style="opacity: 0;">
              <a href="https://www.facebook.com/serallecalcadosoficial/" target="_blank">
                <div class="se-circle">
                  <i class="fa fa-facebook-f"></i>
                </div>
              </a>
            </li>
          </ul>
        </section>

        <section id="fale-conosco">
          <h3>Fale agora conosco</h3>
          <ul class="se-footer-list">
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=5544999290897&text=Converse com Serallê Calçados!"
                target="_blank"
              >
                <i class="fas fa-comment"></i>
                <b>WhatsApp</b>
                <br />(44) 99929-0897
              </a>
            </li>
            <li>
              <a href="tel:04430183357">
                <i class="fas fa-phone"></i>
                <b>Televendas</b>
                <br />(44) 3018-3357
              </a>
            </li>
          </ul>
        </section>

        <section id="atendimento">
          <h3>Horário de atendimento e-commerce</h3>
          <ul class="se-footer-list">
            <li style="line-height: 27px;">Segunda à sexta: 8h às 18h</li>
          </ul>
        </section>
      </div>
    </section>

    <section id="footer-after-links">
      <div class="se-container se-flex">
        <section id="formas-pagamento">
          <h3>Formas de pagamento</h3>
          <div class="se-flex">
            <img src="/dist/img/default/visa.png" alt />
            <img src="/dist/img/default/mastercard.png" alt />
            <img src="/dist/img/default/american-express.png" alt />
            <img src="/dist/img/default/i-something.png" alt />
            <img src="/dist/img/default/elo.png" alt />
            <img src="/dist/img/default/hiper.png" alt />
            <img src="/dist/img/default/hipercard.png" alt />
            <img src="/dist/img/default/boleto.png" alt />
          </div>
        </section>

        <section id="seguranca">
          <h3>Segurança</h3>
          <div class="se-flex">
            <img src="/dist/img/default/compra-segura.png" alt id="compra-segura" />
            <img src="/dist/img/default/e-bit.png" alt id="e-bit" />
            <img src="/dist/img/default/empresa-associada.png" alt id="empresa-associada" />
          </div>
        </section>

        <section id="a-seralle">
          <h3>A Serallê</h3>
          <p>Com 14 anos de muita história para contar, hoje temos 12 lojas espalhadas por todo o estado do Paraná. A nossa trajetória, desde o início, só acontece com um único objetivo: levar o que há de melhor para os nossos clientes e com o menor preço sempre.</p>
        </section>
      </div>
    </section>

    <section id="footer-copyright">
      <div class="se-container">
        <h3>
          © Serallê 2020 . Todos os direitos reservados. Conheça nossa Política de Privacidade |
          <br />FRONTEIRA COM DE CALC EIRELI EPP - CNPJ: 25.421.179/0001-81 - Avenida Brasil, 456, Centro, CEP: 85.851-000, Foz do Iguaçu, PR, Brasil.
        </h3>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: "LojaFooter"
};
</script>

<style lang="css">
#newsletter {
	background-color: #2B85C1;
	height: 130px;
    z-index: 0;
}

.se-footer-list .se-circle i.fa.fa-instagram {
    padding-left: 12px;
}

#se-newsletter-form {
    margin: 0 41px auto auto;
}

#se-newsletter-image-holder {
    margin-left: 39px;
    margin-top: 38px;
}

#newsletter span.discount {
	font-size: 28px;
	color: #A7FFEF;
    text-transform: uppercase;
    font-family: 'axiforma-bold';
}

#newsletter span.discount-text {
    position: absolute;
    font-size: 16px;
    color: #001C3E;
    display: flex;
    bottom: 0px;
}

#newsletter input[type="text"] {
    border: none;
    border-radius: 5px;
    width: 265px;
    height: 52px;
    padding-left: 15px;
    font-size: 12px;
    color: #8CA2A6;
    margin-right: 24px;
    letter-spacing: 1.33px;
}

#newsletter input[type="text"]:focus {
	outline: none;
}

#newsletter select {
    width: 78px;
    height: 52px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    margin-right: 24px;
    color: #8CA2A6;
    padding-left: 10px;
    padding-right: 10px;
}

#newsletter select:focus {
	outline: none;
}

.se-button-blue {
	width: 180px;
	height: 46px;
	background-color: #2BBAFE;
	border: none;
	color: white;
	text-transform: uppercase;
	letter-spacing: 1.25px;
	border-radius: 5px;
	font-size: 16px;
	line-height: 50px;
    cursor: pointer;
}

.se-button-blue:focus {
	outline: none;
}

#newsletter form {
    margin-top: 40px;
    z-index: 1;
}

#newsletter .se-text.se-relative {
    margin-right: 53px;
    padding-top: 40px;
    height: 88px;
    padding-left: 0px;
}

img#img-newsletter {
    height: 130px;
    position: absolute;
    left: 178px;
}

#footer-links {
	background-color: #212E3C;
	min-height: 307px;
	border-bottom: 1px solid #97979770;
}

section#footer-links h3 {
	margin: 0;
	color: white;
	font-family: 'axiforma-bold';
	font-size: 16px;
}

ul.se-footer-list {
	list-style-type: none;
	padding-inline-start: 0;
	color: #5A6672;
	font-size: 14px;
}

.se-footer-list a:visited,
.se-footer-list a:focus,
.se-footer-list a:active,
.se-footer-list a {
	text-decoration: none;
	color: #5A6672;
	font-size: 14px;
}

.se-footer-list a:hover i.fa {
	text-decoration: none;
	color: #5A6672;
}

.se-footer-list a:hover {
	font-weight: bold;
	color: #8294a7;
}

section#footer-links section {
	margin-top: 52px;
}

#fale-conosco ul {
	width: 80%;
}

section#redes-sociais ul.se-footer-list li {
	float: left;
	margin-right: 50px;
}

ul.se-footer-list li {
	margin-top: 25px;
}

#atendimento {
    margin-left: 44px;
}

.se-circle {
	height: 40px;
	width: 40px;
	background-color: #fff;
	border-radius: 100%;
}

.se-footer-list .se-circle i.fa {
	padding-left: 15px;
	padding-top: 10px;
	font-size: 20px;
}

#fale-conosco .se-footer-list i.fa {
	color: #fff;
	margin-right: 10px;
}

#fale-conosco .se-footer-list i.fa {
	color: #fff;
	margin-right: 10px;
}

ul.se-footer-list li:first-child {
	margin-top: 10px;
}

#redes-sociais ul.se-footer-list li {
	margin-top: 0px;
}

section#footer-after-links {
	background-color: #212e3c;
	min-height: 230px;
}

img#compra-segura {
	height: 27px;
	width: 89px;
	opacity: 0.6;
	margin-top: 30px;
}

img#e-bit {
	width: 90px;
	height: 95px;
	margin-left: 30px;
}

img#empresa-associada {
	width: 75px;
	height: 95px;
	margin-left: 30px;
}

section#footer-after-links h3 {
	font-size: 16px;
	font-family: 'axiforma-bold';
	color: #fff;
}

#a-seralle p {
    color: #5A6672;
    font-size: 12px;
    letter-spacing: 0.34px;
    line-height: 20px;
    font-family: 'axiforma-regular';
}

#formas-pagamento {
    max-width: 345px;
    margin-left: 39px;
}

#formas-pagamento img {
	margin: 0 5px 5px 0;
	width: 57px;
	height: 35px;
}


#seguranca {
    margin-left: 63px;
}

#institucional {
    margin-left: 39px;
}

#ajuda {
    margin-left: 79px;
}

#redes-sociais {
    margin-left: 41px;
}

#a-seralle {
    margin-left: 97px;
    width: 384px;
}

#footer-copyright h3 {
    font-size: 10px;
    font-family: 'axiforma-regular';
    color: #fff;
    text-align: center;
    font-weight: 100;
    letter-spacing: 0.34px;
    line-height: 15.5px;
    padding-top: 33px;
    width: 792px;
    margin: 0 auto;
}

section#footer-copyright {
	height: 111px;
	background-color: #1B2530;
	border-top: 1px solid #97979770;
}

section#nerau-bar {
	background-color: #F0F0F0;
	height: 80px;
}

#nerau-bar .se-container {
	text-align: center;
}

img#nerau-logo {
	width: 88px;
	height: 28px;
	margin-top: 27px;
}

#footer-after-links section h3 {
    margin-top: 0px;
}

#footer-after-links section {
    margin-top: 33px;
}

@media(max-width: 1280px){
    #se-newsletter-image-holder{
        margin-left: 28px;
    }
    #img-newsletter{
        left: 0px !important;
    }
    #institucional {
        margin-left: 30px;
    }
    #ajuda {
        margin-left: 70px;
    }
    #redes-sociais {
        margin-left: 38px;
    }
    #atendimento {
        margin-left: 35px;
    }
    #formas-pagamento{
        margin-left: 33px;
    }
    #seguranca {
        margin-left: 27px;
    }
}
@media(max-width: 1024px){
    #se-newsletter-image-holder{
        margin-left: 15px;
    }
    #se-newsletter-form {
        margin-right: 0px !important;
    }
    #newsletter input[type="text"]{
        width: 235px;
        margin-right: 15px;
    }
    #img-newsletter{
        left: 0px !important;
    }
    .se-footer-list .se-circle i.fa {
        padding-left: 12px;
        padding-top: 9px;
    }
    
    .se-footer-list .se-circle i.fa.fa-instagram {
        padding-left: 9px;
        padding-top: 8px;
    }
    #seguranca {
        margin-left: 0px;
    }
    #formas-pagamento {
        margin-left: 15px;
    }
    #e-bit {
        width: 70px !important;
        height: 80px !important;
        margin-left: 10px !important;
    }
    #empresa-associada {
        height: 84px !important;
        width: 66px !important;
        margin-left: 10px !important;
    }
    #a-seralle {
        margin-left: 40px;
        width: 330px;
    }
}
</style>