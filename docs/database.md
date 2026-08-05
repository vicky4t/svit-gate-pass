# Database
- postgres with ORM- prisma


## Overview

The SVIT Gate Pass system uses a relational database to persist all application data.

## Database Technology

- **Primary**: PostgreSQL / 
- **ORM**: prisma/ TypeORM 

## Entity-Relationship Diagram

See [diagrams/database-schema.png](diagrams/database-schema.png) for ER diagram.

## Core Tables

### Users
- `id` (Primary Key)
- `email` (Unique)
- `username` (Unique)
- `password_hash`
- `full_name`
- `role` (admin, staff, student, visitor)
- `status` (active, inactive, suspended)
- `created_at`
- `updated_at`

### Gate Passes
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `title`
- `description`
- `purpose`
- `status` (pending, approved, rejected, expired)
- `entry_time`
- `exit_time`
- `valid_from`
- `valid_to`
- `created_at`
- `updated_at`

### Approvals
- `id` (Primary Key)
- `gate_pass_id` (Foreign Key)
- `approver_id` (Foreign Key)
- `decision` (approved, rejected)
- `comments`
- `approved_at`

### Audit Logs
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `action`
- `entity_type`
- `entity_id`
- `changes`
- `created_at`

## Indexing Strategy

Key indexes for performance:
- `users.email`
- `users.username`
- `gate_passes.user_id`
- `gate_passes.status`
- `gate_passes.created_at`
- `audit_logs.user_id`

## Backup Strategy

- Daily automated backups
- Weekly full backups retained for 1 month
- Monthly backups retained for 1 year
- Point-in-time recovery capability

## Connection Pooling

- Min pool size: 5
- Max pool size: 20
- Idle timeout: 30 minutes
