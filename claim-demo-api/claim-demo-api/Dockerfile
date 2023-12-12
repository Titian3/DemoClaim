FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["claim-demo-api/claim-demo-api.csproj", "claim-demo-api/"]
RUN dotnet restore "claim-demo-api/claim-demo-api.csproj"
COPY . .
WORKDIR "/src/claim-demo-api"
RUN dotnet build "claim-demo-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "claim-demo-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "claim-demo-api.dll"]
