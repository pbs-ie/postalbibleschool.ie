@extends('errors::layout-custom')

@section('title', __('Unauthorized'))
@section('code', '403')
@section('message', __('You do not have permission to view this page. Please contact info@postalbibleschool.ie if this is a mistake.'))