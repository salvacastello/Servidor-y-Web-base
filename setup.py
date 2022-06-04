# -*- coding: utf-8 -*-
from distutils.core import setup
import py2exe

setup(
    name="XSal2021",version="1.0",description="Servidor domótico",
    author="Salvador Castelló Castelló",
    author_email="salva.castello.c@gmail.com",
    url="",
    license="protegida por propiedad intelectual",
    scripts=["XSal2021.py"],
    console=["XSal2021.py"],
    options={"py2exe": {"bundle_files": 1}},
    zipfile=None
    )