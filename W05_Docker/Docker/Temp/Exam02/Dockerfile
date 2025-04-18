#Sử dụng python 3.9 để base
FROM python:3.9

#Tạo thư mục app
WORKDIR /app

#Copy file requirements.txt vào thư mục app
COPY requirements.txt .

#Cài đặt các thư viện trong requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

#Copy toàn bộ mã nguồn vào thư mục app
COPY . .

#Expose port 5000
EXPOSE 5000

#Chạy ứng dụng Flask
CMD ["python", "app.py"]