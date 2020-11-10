!<template>
    <div class="update-info-container">
            <div class="close-icon" @click="closeUpdateInfo">X</div>
            <h2 class="update-info-container__title">Verileri Nasıl Güncelleyeceğiz?</h2>
            <p>Bu panel yapısının altyapısı modern web teknolojileri ile sağlanıyor, bu yüzden verileri düzenlemek için kullanabileceğimiz
                birkaç farklı yöntem var. Bunların hepsinin çeşitli avantaj ve dezavantajları olabilir. Aynı zamanda farklı güncelleme yöntemlerine
                göre sistemi farklı şekillerde çalıştırabiliriz.
            </p>
            <p>Alternatifler şu şekilde:</p>

            <h3 class="update-info-container__subtitle">1 - Doğrudan Ekran Üzerinde Güncelleme</h3>
                <p>Ekran üzerinde göstereceğimiz tüm bilgiler doğrudan bu ekran üzerinden güncellenebilir. Örneğini görmek için,
                    şu anda ekranda bulunan "Ünite sayısı" ve "Toplam kW" bölümleri üzerine çift tıklayabilirsiniz.
                </p>
                <p>Bu durumda bütün sistemi lokal olarak çalışabilir (hatta, öyle olması daha iyi olur). Sistemin "127.0.0.1:8080" gibi bir adresi olur. Ofisin girişindeki ekranlarda bir web tarayıcı tam ekran olarak bu adresi gösterir.</p>
                <p>Bu yöntemi tercih edersek ofis içindeki herhangi birisi aynı adrese kendi bilgisayarından bağlanıp gerektiği anda her türlü veriyi değiştirebilir. Yöntemin temel avantajları da istendiği zaman verilerin rahatça değiştirilebilmesi ve herhangi bir database'e ihtiyaç duyulmaması olur.</p>
                <p>Ancak bu yöntemle ofis dışından verileri değiştiremeyiz, mutlaka ofis içinden birinin bunu yapması gerekir. Aynı şekilde, bu ekranı başka bir yerden göstermemiz gerekirse oraya kurulumun ayrıca yapılması gerekir. </p>

            <h3 class="update-info-container__subtitle">2 - Berk Tarafından  Güncelleme</h3>
                <p>İkinci alternatif olarak, bir güncelleme yapılması gerektiğinde bunu benimle paylaşabilirsiniz ve ben doğrudan kod üzerinde yeni verileri girebilirim.</p>
                <p>Bu yöntemin avantajı kimsenin bununla uğraşmaması ve tüm sistemin tek yerden yönetilmesi olur. Dezavantajı ise her güncelleme gerektiğinde bana iletmek gibi ek bir aşama yaratması olur.</p>
                <p>Bu şekilde güncellemek isterseniz daha hızlı olması için sistemi internet üzerinden çalıştırmamız (ya da en azından veriyi internet üzerinden çekmemiz) gerekir, yani tamamen localhost üzerinden çalıştıramayız. Bunun artısı olarak da, ekrana her yerden ulaşabiliriz.</p>
                
            <h3 class="update-info-container__subtitle">3 - Güncelleme Paneli Üzerinden Güncelleme </h3>
                <p>En ideal çözümlerden bir tanesi, sistemdeki verilerin çok basit bir panel üzerinden güncellenmesi olur.</p>
                <p>Arka planda çok basit bir database çalıştırırız, burada panelde göstermek istediğimiz bilgiler depolanır. Güncelleme paneli üzerinden veriler buraya girilir, ekran da verileri buradan çeker.</p>
                <p>Bu sayede, basit bir kullanıcı adı - şifre kombinasyonuyla (hatta sadece PIN koduyla) yetkisi olan herkes verileri istediği yerden güncelleyebilir, yurt dışındayken veya telefonla bile güncelleme yapabilirsiniz, bu güncellemeler anında panelde gözükür. Hatta bir güncelleme geldiğinide, örneğin ünite sayısı 35K'dan 36K'ya çıktığında değişiklik yapılan modülde dikkat çekici bir animasyon vs. de eklenebilir, böylece ekran daha da interaktif bir hale gelmiş olur.</p>
                <p>Bu sistemin dezavantajı kurulum sürecini biraz uzatmak olur çünkü ek bir panel daha tasarlamak, bir database kurmak ve ekranın bu verileri buradan çekmesini sağlamak gerekir. Bu süreç bir hafta içinde rahatlıkla tamamlanır ama eğer çok sık güncellemeye gerek yoksa veya ilk alternatifteki gibi tıklayarak doğrudan ekran üzerinde güncelleme yapmak daha kolaysa gereksiz bir süreç olabilir.</p>
            <h3 class="update-info-container__subtitle">4 - Otomatik Güncelleme </h3>
                <p>Bize en az iş yaratacak güncelleme yöntemi olarak, çok basit algoritmalarla güncellemeleri otomatik olarak yapabiliriz.</p>
                <p>Şu anda saatin otomatik olarak ilerlemesi gibi, belirlediğimiz aralıklarla sayılar otomatik olarak artabilir; örneğin, her hafta ünite sayısına 100 ekleyebiliriz, veya her gün kW miktarını %0.5 arttırabiliriz - burada istediğiniz saat, gün, hafta, ay ve istediğiniz artış miktarları kodlanabilir.</p>
    
        <button @click="closeUpdateInfo" class="close-button">Kapat</button>

    </div>


</template>

<script>
    export default {
        data() { return {

        }},
        methods: {
            closeUpdateInfo() {
                console.log("closed")
                this.$emit("closed")
            }
        }
    }
</script>

<style scoped>

p{
    font-family: "Inter", Helvetica, sans-serif;
    font-size: 1.7rem;
    line-height: 2.8rem;
    margin-bottom: 1.1rem;

}

.close-icon{
    color: white;
    background-color: darkred;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    float: right;

    position: relative;
    clear: both;
    z-index: 3;
}

.update-info-container {

position: absolute;
left: 10%;
top: 5%;
align-self: center;
justify-self: center;
z-index: 2;
padding: 4rem;

background-color: white;

border: 1px solid gray;
border-radius: 10px;
width: 80vw;
height: 85vh;
margin: 10px auto;

font-family: "Inter", Helvetica, sans-serif;
overflow: auto;


}

.update-info-container__title{
    font-size: 4rem;
    margin-bottom: 1.8rem;
}

.update-info-container__subtitle{
    font-size: 2.4rem;
    margin-bottom: 1.1rem;
    margin-top: 4rem;
}

.close-button {
    width: 30%;
    margin: 2rem auto;
    height: 5rem;
    background-color: rgb(136, 45, 45);
    border: 1px solid rgb(136, 45, 45);
    color: white;
    cursor: pointer;
    transition: all .2s;

    font-size: 2.1rem;
    letter-spacing: 1.3px;
}


.close-button:hover {
    background-color: #cc4040;
}


</style>