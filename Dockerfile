# Use the official Bitnami Laravel image as the base image
FROM bitnami/laravel:latest

# Set the working directory inside the container
WORKDIR /app
# Set timezone to South Africa
RUN ln -sf /usr/share/zoneinfo/Africa/Johannesburg /etc/localtime

# Copy your Laravel app code into the container
COPY . .

# Set environment variables
ENV APP_NAME="Sales Tasks"

# Expose the port your Laravel app will run on (default is 8000)
EXPOSE 8000

# Start your Laravel app
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
