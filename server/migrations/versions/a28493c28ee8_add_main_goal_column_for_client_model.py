"""add main_goal column for Client model

Revision ID: a28493c28ee8
Revises: d9acf8d4891e
Create Date: 2023-07-13 08:43:17.143367

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a28493c28ee8'
down_revision = 'd9acf8d4891e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('main_goal', sa.String(), nullable=False))
        batch_op.alter_column('_password_hash',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.alter_column('_password_hash',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
        batch_op.drop_column('main_goal')

    # ### end Alembic commands ###