"""edit password has column in Client model

Revision ID: d9acf8d4891e
Revises: b55212917fcf
Create Date: 2023-07-12 10:54:11.625493

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd9acf8d4891e'
down_revision = 'b55212917fcf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(length=255)))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###
