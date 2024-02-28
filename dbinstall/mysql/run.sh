#!/bin/bash
mysqld --initialize
systemctl start mysqld
mysqladmin -u root password "123456"