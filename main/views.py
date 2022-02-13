from django.shortcuts import render
from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = 'index.html'

class LoginPageView(TemplateView):
    template_name = 'login.html'

# PRODUCTS TEMPLATES
class MeasureUnitPageView(TemplateView):
    template_name = 'products/measure_unit.html'

class CategoryProductPageView(TemplateView):
    template_name = 'products/category_product.html'

class IndicatorPageView(TemplateView):
    template_name = 'products/indicator.html'

class ProductPageView(TemplateView):
    template_name = 'products/product.html'

# EXPENSE TEMPLATES
class ExpenseCreateView(TemplateView):
    template_name = 'expense/new_expense.html'