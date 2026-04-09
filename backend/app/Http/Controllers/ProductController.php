<?php

namespace App\Http\Controllers;

use App\Http\Requests\BuyProductsRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Throwable;

class ProductController extends Controller
{
    protected $product;

    public function __construct(Product $product){
        $this->product = $product;
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = $this->product->with('category');
        if($request->has('category_id')){
            $query->where('category_id', $request->input('category_id'));
        }
        $products = $query->get();
        return response()->json($products, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        $data = $request->validated();
        
        if($request->hasFile('image')){
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = url('storage/'.$path);
        }
        $product = $this->product->create($data);
        $id = $product->id;
        $product_category = $this->product->with('category')->findOrFail($id);

        return response()->json($product_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $product = $this->product->with('category')->findOrFail($id);
        return response()->json($product, Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $id): JsonResponse
    {
        $product = $this->product->with('category')->findOrFail($id);
        $data = $request->validated();
        
        if($request->hasfile('image')){
            try{
                $image_name = explode('products/', $product['image']);
                Storage::disk('public')->delete('products/'.$image_name[1]);
            } catch(Throwable){
            }finally{
                $path = $request->file('image')->store('products', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $product->update($data);
        return response()->json($product, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $product = $this->product->findOrFail($id);
        $product->delete();
        return response()->json(['Message' => 'Produto deletado com sucesso']); 
    }

    public function buy(BuyProductsRequest $request, $id): JsonResponse
    {
        $data = $request->validated();
        $amount = $data['amount'];
        $product = $this->product->findOrFail($id);
        if ($product->amount < $amount){
            return response()->json(['Menssage' => 'Quantidade excede o estoque']);
        }

        $product->amount -= $amount;
        $product->save();
        return response()->json(['Menssage' => 'Compra realizada com sucesso'], Response::HTTP_OK);
    }
} 
 

 