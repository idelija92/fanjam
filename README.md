** FanJam **

git clone https://github.com/idelija92/fanjam.git
cd fanjam

# Start backend
cd backend
cp src/main/resources/application-sample.properties src/main/resources/application.properties
# Edit with your db credentials
mvn spring-boot:run

# In a new terminal/tab for frontend
cd ../frontend
npm install
npm start
