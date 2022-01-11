mkdir src/main/resources/static

cd ../frontend
npm install && npm run build
cd ..

cp -r ./frontend/build/* ./backend/src/main/resources/static