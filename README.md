## Kartaca Staj Görevi Proje Açıklama

Bu projede API'ye gelen isteklerin canlı olarak grafik üzerinden takip edilmesi amaçlandı. Bu projede MERN Stack, Chartjs, Socket.io ve Kafka kullanılmıştır.

## Senaryo

API'ye gelen her istek  random 0-3 sn arasında başarılı bir yanıt döner
ve yanıt dönülmeden hemen önce "{metot tipi},{istek cevaplama ms},{timestamp}" gibi bir içerik ile log objesine isteğin ne kadar sürdüğü yazılır. Bir kafka producer'ı
bu log objesini kafka consumer'a gönderir ve kafka consumer bunu veritabanına yazar. Socket.io ise son 1 saatte API'ye yapılan istekleri veritabanından ön yüze gönderir. 


## Başlarken

1. Repoyu klonlayın.

2. docker-compose.yml dosyasında kafka'nın altındaki şu satırlarda bulunan ```YOUR_IP_ADDRESS``` kısmına kullandığınız makinenin ip adresini yazın.

```
KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://YOUR_IP_ADDRESS:9092 
KAFKA_ADVERTISED_HOST_NAME=YOUR_IP_ADDRESS

```

3. /server/helper/kafka klasörü içindeki Kafka.js dosyasında bulunan ```YOUR_IP_ADDRESS``` kısmına kullandığınız makinenin ip adresini yazın. 

```
const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["YOUR_IP_ADDRESS:9092"],
});
```

4. Konsola ```docker-compose up``` yazın ve komutu çalıştırın. 

5. Proje ayağa kalktığında ;

``` 
http://localhost:3000  -> client
http://localhost:5000  -> server

```
---
**KÜÇÜK NOT**

Önyüz'de grafiği x-ekseninde 6 dakikalık zaman dilimlerine böldüm. Bu yüzden proje ilk çalıştırıldığında grafiğin x-axis'inde hiçbir şey görünmeyebilir.

---

# API

| Route | HTTP Verb	 | POST body	 | 
| --- | --- | --- | 
| http://localhost:5000/ | `GET` | Empty | 
| http://localhost:5000/ | `POST` | Empty | 
| http://localhost:5000/ | `PUT` | Empty | 
| http://localhost:5000/ | `DELETE` | Empty | 


## Özel Anahtar Kodu

gAAAAABgUNSnACLkJ3IJy2BCx5Sv2sgh9KzTbqw1LbYaX4_m0TFaXgMxEJD2H6e_chxi-kfHzG-_m6NDt4MIpeMUjQQu-m1F-sG1c8Ets_UGCaUfvGfjGyOijCpMOMXPqZeGaYrs24VVRiFn94T-xEPRhdynmR7FKwr1c5EmyaAbFFNwqtWsLEu65JZBARTu58vzd1TF012c

