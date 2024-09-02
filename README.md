# Tao mot file voi create-vpc.sh
## Su dung cau lenh
```bash
vi create-vpc.sh
```

```bash
#!/bin/bash
#create vpc
vpc_id=$(aws ec2 create-vpc --cli-input-yaml file://vpc-conf.yaml | grep -oP '"VpcId":\s*"\K[^"]+')
#create subnet
subnet_id=$(aws ec2 create-subnet --cli-input-yaml file://subnet-conf.yaml --vpc-id ${vpc_id}| grep -oP '"SubnetId":\s*"\K[^"]+')
#map assign ip address when launch
aws ec2 modify-subnet-attribute --subnet-id ${subnet_id} --map-public-ip-on-launch
echo "map success"
#create route table
route_table_id=$(aws ec2 create-route-table --cli-input-yaml file://route-table-conf.yaml --vpc-id ${vpc_id} | grep -oP '"RouteTableId":\s*"\K[^"]+')
#map subnet to route table
aws ec2 associate-route-table --route-table-id ${route_table_id} --subnet-id ${subnet_id}
echo "map subnet to route table successfully"
#create IGW
IGW_id=$(aws ec2 create-internet-gateway --tag-specifications "ResourceType=internet-gateway, Tags=[{Key=Name, Value=custom-internet-gateway}]" | grep -oP '"InternetGatewayId":\s*"\K[^"]+')
echo "create IGW successfully"
# attach IGW to VPC
aws ec2 attach-internet-gateway --vpc-id ${vpc_id} --internet-gateway-id ${IGW_id}
echo "attached IGW"
# create route for IGW to Internet
aws ec2 create-route --route-table-id ${route_table_id} --gateway-id ${IGW_id} --destination-cidr-block 0.0.0.0/0
```
