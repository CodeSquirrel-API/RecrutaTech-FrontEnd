<!-- <template>
    <div class="header">
        <img class="logo" src="../assets/logo.svg" alt="Logo esquilo">
    </div>

</template>

<style scoped>

    .header{
        background-color:black;
        height: 3rem;
        width: 100%;
        display: flex;
        justify-content: start; /* Alinhamento horizontal */
        align-items: center;
    }
    .logo{
        text-align: center;
        width:2.5rem;
        height:2.5rem;
        margin-left: 10px;
    }

</style> -->
<template>
    <header :class="{ 'sticky': isHeaderSticky }">
        <a href="home.html" class="logo"></a>
        <div class="menu-btn">
            <div class="navigation">
                <div class="navigation-items">
                    <a style="cursor: default;" href=""><span style="vertical-align: bottom; font-size: 1.5em;"
                            class="material-icons">account_circle</span>{{username}}</a>
                </div>
            </div>
        </div>
    </header>
</template>
<style>
.navigation-items a span {
    margin-right: 10px;
    color: #5D5DFF;
    text-align: center;
    vertical-align: center;

}

header .logo {
    cursor: pointer;
    margin-top: 3px;
    width: 100px;
    height: auto;

}

h3 {
    font-family: Montserrat;
    font-size: 5em;
}

header {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 200px;
    transition: 0.5s ease;

}

header .navigation {
    position: relative;

}

header.sticky .navigation .navigation-items a {
    background: #121415ad;
}

header .navigation .navigation-items a {
    position: relative;
    color: #fff;
    font-size: 1.25em;
    font-weight: normal;
    text-decoration: none;
    padding: 20px 20px;
    background: #121415;
    border-radius: 10px 0px 0px 10px;
    box-shadow: 0 5px 5px rgb(0, 0, 0, 0.3);
    margin-left: 30px;
    transition: 0.3s ease;
}

header .navigation .navigation-items a:hover {
    position: relative;
    color: #fff;
    font-size: 1.25em;
    text-decoration: none;
    margin-left: 30px;
    transition: 0.3s ease;
}

header .navigation .navigation-items a:before {
    content: '';
    position: absolute;
    background: #5D5DFF;
    width: 0;
    height: 3px;
    bottom: 0;
    left: 0;
    transition: 0.4s ease;
}

header .navigation .navigation-items a:hover:before {
    width: 100%;
    background: #5D5DFF;
}
</style>

<script>
import axios from 'axios';
import baseURL from '../service/api';

export default {
  data() {
    return {
      username: '',
      error:'',
      config:'',
      
    };
  },

    mounted() {
      this.username = (localStorage.getItem('email') || '').split('@')[0];

    },

};
        
</script>
