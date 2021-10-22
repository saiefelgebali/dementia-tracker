#include <TinyGPS++.h>
#include <SoftwareSerial.h>

static const int RXPin = 4, TXPin = 3;
static const uint32_t GPSBaud = 9600;

// The TinyGPS++ object
TinyGPSPlus gps;
float cur_long = 0.0;
float cur_lat = 0.0;

float prev_long = 0.0;
float prev_lat = 0.0;

float lat_dif = 0.0;
float long_dif = 0.0;

float lat_meters = 0.0;
float long_meters = 0.0;

float distance = 0.0;
// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

void setup(){
  Serial.begin(9600);
  ss.begin(GPSBaud);
}

void loop() {
  // put your main code here, to run repeatedly:
  while (ss.available() > 0){
    gps.encode(ss.read());
    if (gps.location.isUpdated()){
      cur_lat = gps.location.lat(), 6;
      cur_long = gps.location.lng(), 6;
      if (cur_lat > prev_lat){
      lat_dif = cur_lat - prev_lat;
      }
      else if(prev_lat > cur_lat){
        lat_dif = prev_lat - cur_lat;
      }

      if (cur_long > prev_long){
        long_dif = cur_long - prev_long;
      }
       else if (prev_long > cur_long){
        long_dif = prev_long - cur_long;
       }

      lat_meters = lat_dif * 139;
      long_meters = long_dif * 111;

      distance = sqrt((sq(lat_meters)+sq(long_meters)));
      distance = distance * 1000;
      Serial.println(distance);

      if (distance > 19){
       prev_lat = cur_lat;
        prev_long = cur_long;
       Serial.print("LATITUDE="); 
       Serial.print(gps.location.lat(), 6);
       Serial.print(",")
       Serial.print("LONGITUDE="); 
       Serial.print(gps.location.lng(), 6);
      }
    }
  }
}