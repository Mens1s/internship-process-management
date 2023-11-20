import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Home = () => {
  const { auth }: any = useContext(AuthContext);

  return (
    <>
      <Container>
        <h2>
          Gebze Teknik Üniversitesi staj başvuru yönetim sayfasına hoş geldiniz!
        </h2>
        <p>
          Bu sistemden yeni staj başvurusunda bulunabilir veya geçmiş
          başvurularınızı görebilirsiniz.
        </p>
        <a
          target="_blank"
          href="https://www.gtu.edu.tr/kategori/2668/0/display.aspx"
        >
          Staj yönergesine ulaşmak için tıklayınız
        </a>
        <p>
          Zorunlu Staj, Gebze Teknik Üniversitesi Mühendislik Fakültesi Lisans
          öğrencilerin öğretim planında geçen yapmakla yükümlü oldukları
          stajları ifade eder. GTÜ Mühendislik Fakültesi Lisans öğrencileri,
          öğrenimleri boyunca zorunlu stajlarını en az 40 iş günü yapmakla
          yükümlüdür. Mezun olabilmek için bu sürenin tamamlanması zorunludur.
          Zorunlu Stajlar, her biri 20 iş günü olmak üzere iki ayrı kurumda
          yapılır. Öğrenciler, Zorunlu stajlarının ilkini 4. yarıyıldan sonra,
          ikincisini 6. yarıyıldan sonra yapabilirler.
        </p>
        <p>
          Dönem içerisinde uzun dönem staj yapılabilir. Uzun dönem staj
          yapılabilmesi için ilgili firma ile protokol anlaşması olmalıdır
          (Bölümün Protokol imzaladığı firmalar listesine Bölüm Başkanlığı ve
          staj komisyonundan ulaşılabilir). Bu staja seçilecek öğrenciye Kurum
          ve ilgili Bölüm Staj Komisyonu karar verir. Bu staj, Bölüm Staj
          Komisyonunun değerlendirmesi sonucunda 20 iş gününe karşılık gelen
          zorunlu staja sayılabilir.
        </p>
        <p>
          8. Yarıyıla kadar 200 AKTS’yi tamamlamış ve not ortalaması 3.0’ın
          üzerinde olan öğrencilerimiz ENG/MUH 498 Endüstriyel Uygulamalar
          dersine kaydolabilirler. Lisans Öğretim Planının 4. sınıf Bahar
          Yarıyılında bulunan ENG/MÜH 498 Endüstriyel Uygulamalar dersine ait
          gerekli şartlar Endüstriyel Uygulamalar Dersi Yönergesi ve Endüstriyel
          Uygulamalar Protokol formunda yer almaktadır. Bu ders için ilgili
          firma ile protokol anlaşması olmalıdır (Bölümün Protokol imzaladığı
          firmalar listesine Bölüm Başkanlığı ve Dekanlığın ENG498 sayfasından
          ulaşılabilinir).
        </p>
        <p>
          Staj Yönergemizde İsteğe Bağlı Staj tanımı bulunmakta olup, Gebze
          Teknik Üniversitesi Mühendislik Fakültesi Lisans öğrencilerin öğretim
          planında geçen yapmakla yükümlü oldukları stajların dışındaki stajları
          kapsar. 20 iş günü (Zorunlu) Staj ve devamında ise fazladan yapılan
          kısımın (isteğe bağlı) SGK girişi Fakültemiz tarafından yapılmaktadır.
        </p>
        <p>
          Staj Yönergemizde "Gönüllü staj" tanımı bulunmamaktadır. Çalışmak
          istediğiniz takdirde firmanın SGK ile ilgili işlemlerinizi yerine
          getirmesi sizin ve firmanın sorumluluğudur.{" "}
        </p>
      </Container>
    </>
  );
};

export default Home;
